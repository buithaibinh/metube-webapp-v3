import type { LegacyVideoResult, VideoFormat, VideoInfo } from '~/types/api'

function mapLegacyFormat(format: LegacyVideoResult['formats'][number]): VideoFormat {
  const hasVideo = format.vcodec !== 'none'
  const hasAudio = format.acodec !== 'none'
  const resolution = format.height ? `${format.height}p` : format.resolution ?? null

  return {
    format_id: format.format_id,
    ext: format.ext,
    resolution,
    fps: format.fps ?? null,
    filesize: format.filesize != null ? String(format.filesize) : null,
    has_video: hasVideo,
    has_audio: hasAudio,
    url: format.url,
  }
}

/** Map legacy yt-dlp API payload to UI-friendly VideoInfo. */
export function mapLegacyVideoInfo(result: LegacyVideoResult): VideoInfo {
  return {
    id: result.videoId,
    title: result.title,
    thumbnail: result.thumbnail ?? null,
    duration: result.duration ?? null,
    source_url: result.url ?? null,
    uploader: result.extractor ?? null,
    formats: (result.formats ?? []).map(mapLegacyFormat),
    legacy: result,
  }
}
