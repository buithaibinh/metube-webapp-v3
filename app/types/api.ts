/** Legacy yt-dlp API (`POST api/video/info`). */
export interface LegacyVideoFormat {
  format_id: string
  ext: string
  acodec?: string
  vcodec?: string
  width?: number
  height?: number
  fps?: number | string
  filesize?: number | string
  url: string
  resolution?: string
}

export interface LegacyVideoResult {
  videoId: string
  title: string
  formats: LegacyVideoFormat[]
  duration?: number
  thumbnail?: string
  extractor?: string
  url?: string
  _version?: Record<string, unknown>
  manifest_url?: string | null
  region?: string
}

export interface LegacyDownloadRecord {
  id: string
  videoId?: string
  url: string
  title?: string
  duration?: number
  extractor?: string
  thumbnail?: string
  status: 'added' | 'downloading' | 'finished' | string
  userId?: string
  created?: string
  updated?: string
  downloadUrl?: string
  options?: {
    trim?: { start: number, end: number }
    audioOnly?: boolean
    videoOnly?: boolean
  }
  msg?: string
}

export interface LegacyQueuePayload {
  video: Omit<LegacyVideoResult, 'formats' | '_version' | 'manifest_url' | 'region'> & {
    identityId?: string
  }
  options: {
    trim: { start: number, end: number }
    audioOnly: boolean
    videoOnly: boolean
  }
}

export interface VideoFormat {
  format_id: string
  resolution?: string | null
  ext: string
  fps?: number | string | null
  filesize?: number | string | null
  has_video: boolean
  has_audio: boolean
  url: string
}

export interface VideoInfo {
  id: string
  title: string
  thumbnail?: string | null
  duration?: number | null
  source_url?: string | null
  uploader?: string | null
  formats: VideoFormat[]
  views?: string
  reactions?: string
  /** Raw legacy payload for server-side queue requests. */
  legacy?: LegacyVideoResult
}

export interface DownloadProgress {
  status: string
  percent: number
}

/** Normalized download row for UI (legacy + future APIs). */
export interface DownloadItem {
  uid: string
  url: string
  title?: string | null
  thumbnail?: string | null
  format?: string | null
  resolution?: string | null
  status: string
  progress: DownloadProgress
  download_url?: string | null
  error_message?: string | null
}

export interface ServerDownloadOptions {
  format: 'mp4' | 'mp3'
  resolution?: string
  start_time?: string
  end_time?: string
}
