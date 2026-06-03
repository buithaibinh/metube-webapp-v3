import type {
  DownloadItem,
  LegacyDownloadRecord,
  LegacyQueuePayload,
  LegacyVideoResult,
  ServerDownloadOptions,
  VideoInfo,
} from '~/types/api'
import { getLegacyApi } from '~/utils/legacyAmplify.client'
import { mapLegacyVideoInfo } from '~/utils/legacyVideo'
import { parseTimeToSeconds } from '~/utils/parseTrim'

function normalizeDownloadItem(raw: LegacyDownloadRecord): DownloadItem {
  const percent
    = raw.status === 'finished'
      ? 100
      : raw.status === 'downloading'
        ? 55
        : 15

  return {
    uid: raw.id,
    url: raw.url,
    title: raw.title,
    thumbnail: raw.thumbnail,
    format: raw.options?.audioOnly ? 'mp3' : 'mp4',
    status: raw.status,
    progress: { status: raw.status, percent },
    download_url: raw.downloadUrl ?? null,
    error_message: raw.msg || null,
  }
}

function buildLegacyQueuePayload(
  video: LegacyVideoResult,
  identityId: string | null,
  options: ServerDownloadOptions,
): LegacyQueuePayload {
  const duration = Math.floor(video.duration ?? 0)
  const start = parseTimeToSeconds(options.start_time ?? '') ?? 0
  const end = parseTimeToSeconds(options.end_time ?? '') ?? duration

  const { formats: _formats, _version, manifest_url, region, ...videoRest } = video

  return {
    video: {
      ...videoRest,
      identityId: identityId ?? undefined,
    },
    options: {
      trim: {
        start: Math.max(0, Math.min(start, end)),
        end: Math.max(start, end, 1),
      },
      audioOnly: options.format === 'mp3',
      videoOnly: false,
    },
  }
}

/**
 * Legacy production API (v2): yt-dlp API Gateway + IAM-signed video API + AppSync updates.
 */
export function useDownloaderApi() {
  const authStore = useAuthStore()

  async function ensureAuth() {
    await authStore.ensureGuest()
    return authStore.identityId
  }

  async function fetchVideoInfo(url: string): Promise<VideoInfo> {
    const API = await getLegacyApi()
    const response = await API.post('ytDlpApi', 'api/video/info', {
      body: { url },
    }) as { status: string, result?: LegacyVideoResult, message?: string, msg?: string }

    if (response.status !== 'ok' || !response.result) {
      throw new Error(response.message || response.msg || 'Failed to fetch video info')
    }

    return mapLegacyVideoInfo(response.result)
  }

  async function listDownloads(): Promise<DownloadItem[]> {
    await ensureAuth()
    const API = await getLegacyApi()

    const response = await API.get('videoApi', 'api/downloads', {}) as {
      status: string
      items?: LegacyDownloadRecord[]
    }

    if (response.status !== 'ok' || !response.items) {
      return []
    }

    return response.items.map(normalizeDownloadItem)
  }

  async function createDownload(
    video: LegacyVideoResult,
    options: ServerDownloadOptions,
  ): Promise<DownloadItem> {
    const identityId = await ensureAuth()
    const body = buildLegacyQueuePayload(video, identityId, options)
    const API = await getLegacyApi()

    const response = await API.post('videoApi', 'api/downloads', {
      body,
    }) as { status: string, item?: LegacyDownloadRecord, message?: string }

    if (response.status !== 'ok' || !response.item) {
      throw new Error(response.message || 'Failed to queue download')
    }

    return normalizeDownloadItem(response.item)
  }

  return {
    fetchVideoInfo,
    listDownloads,
    createDownload,
  }
}
