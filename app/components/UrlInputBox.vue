<template>
  <div class="w-full flex flex-col items-center">
    <!-- Form dán URL -->
    <form
      class="w-full max-w-2xl flex flex-col gap-2 mb-8 shadow-lg"
      @submit.prevent="onSubmit"
    >
      <div class="flex flex-col sm:flex-row w-full gap-2 sm:gap-0">
        <div
          :class="[
            'flex-1 flex items-center rounded-t-xl sm:rounded-tl-xl sm:rounded-bl-none sm:rounded-l-xl sm:rounded-tr-none border border-b-0 sm:border-b border-r-0 sm:border-r-0 px-3 sm:px-4 py-2 text-base sm:text-lg focus-within:ring-2',
            error
              ? 'border-red-500 ring-2 ring-red-400'
              : 'border-gray-200 dark:border-[#232232] focus-within:ring-[color:var(--color-primary)]',
            'bg-gray-100 dark:bg-[#181828] text-gray-900 dark:text-white',
          ]"
        >
          <span
            class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-[#232232] mr-2 sm:mr-3"
          >
            <Icon
              :name="icon"
              :class="iconClass"
              :style="{ color: 'var(--color-primary)' }"
            />
          </span>
          <input
            v-model="inputUrl"
            type="text"
            :placeholder="$t('index.input_placeholder')"
            class="flex-1 bg-transparent outline-none border-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base sm:text-lg"
            @input="error = ''"
          />
        </div>
        <button
          type="submit"
          class="rounded-b-xl sm:rounded-bl-none sm:rounded-r-xl sm:rounded-tr-none px-4 sm:px-8 py-2 text-white font-bold text-base sm:text-lg shadow-md hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto"
          :style="{
            background:
              'linear-gradient(135deg, var(--color-primary-light), var(--color-primary))',
            color: '#fff',
          }"
          :disabled="loading"
        >
          <span v-if="!loading">{{ $t('index.input_button') }}</span>
          <span v-else class="flex items-center gap-2"
            ><svg
              class="animate-spin h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              /></svg
            >{{ $t('loading') }}</span
          >
        </button>
      </div>
      <div v-if="error" class="mt-2 ml-0 sm:ml-2">
        <div
          class="px-3 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 border border-red-200 dark:bg-transparent dark:border-none dark:text-red-400"
        >
          {{ $t(error) }}
        </div>
      </div>
      <p class="px-3 sm:px-4 pb-2 text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
        {{ $t('legal.disclaimer') }}
        <NuxtLink to="/terms" class="underline cursor-pointer hover:text-[color:var(--color-primary)]">
          {{ $t('legal.terms') }}
        </NuxtLink>
        {{ $t('legal.and') }}
        <NuxtLink to="/policy" class="underline cursor-pointer hover:text-[color:var(--color-primary)]">
          {{ $t('legal.policy') }}
        </NuxtLink>.
      </p>
    </form>

    <!-- Skeleton loading -->
    <div
      v-if="loading"
      class="w-full max-w-4xl bg-gray-100 dark:bg-[#181828] rounded-2xl shadow-2xl flex flex-col md:flex-row gap-0 md:gap-6 mb-8 border border-gray-200 dark:border-[#232232] overflow-hidden animate-pulse mx-auto p-3 sm:p-0"
    >
      <!-- Skeleton thumbnail -->
      <div
        class="flex-shrink-0 w-full md:w-80 aspect-video bg-gray-200 dark:bg-[#232232] rounded-2xl md:rounded-none"
      />
      <!-- Skeleton info -->
      <div
        class="flex-1 flex flex-col justify-between p-6 max-w-xl gap-3 sm:gap-4"
      >
        <div class="flex items-center gap-2 mb-2">
          <div class="h-5 w-16 bg-gray-200 dark:bg-[#232232] rounded" />
          <div class="h-5 w-10 bg-gray-200 dark:bg-[#232232] rounded" />
        </div>
        <div class="h-7 w-3/4 bg-gray-200 dark:bg-[#232232] rounded mb-2" />
        <div class="h-10 w-full bg-gray-200 dark:bg-[#232232] rounded mb-2" />
        <div class="h-4 w-24 bg-gray-200 dark:bg-[#232232] rounded mb-2" />
        <div class="h-12 w-full bg-gray-200 dark:bg-[#232232] rounded" />
      </div>
    </div>

    <div
      v-if="showVideoInfo && !loading && videoInfo"
      class="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-0 md:gap-6 mb-8 border border-gray-200 dark:border-gray-700 overflow-hidden mx-auto"
    >
      <!-- Thumbnail -->
      <div
        class="relative flex-shrink-0 w-full md:w-80 aspect-video bg-gray-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden rounded-xl shadow-lg md:rounded-xl md:shadow-lg transition-transform duration-200 hover:scale-105 group"
      >
        <img
          v-if="videoInfo.thumbnail"
          :src="videoInfo.thumbnail"
          :alt="decodeHtmlEntities(videoInfo.title)"
          class="w-full h-full object-cover"
        >
        <a
          v-if="videoInfo.source_url"
          :href="videoInfo.source_url"
          target="_blank"
          class="absolute bottom-3 right-3 bg-white/80 dark:bg-zinc-900/80 rounded-full p-2 shadow hover:bg-purple-100 dark:hover:bg-purple-900 transition-all text-xl cursor-pointer"
          title="Open original video"
          >▶️</a
        >
      </div>
      <!-- Info -->
      <div
        class="flex-1 flex flex-col justify-between p-6 max-w-xl min-h-[340px]"
      >
        <div>
          <!-- Title -->
          <h2
            class="text-2xl font-bold text-gray-900 dark:text-gray-200 leading-snug line-clamp-2 break-words flex-1"
          >
            {{ decodeHtmlEntities(videoInfo.title) }}
          </h2>

          <!-- Meta info -->
          <div
            class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400 mb-4 mt-1"
          >
            <span v-if="videoInfo.views"
              ><span class="mr-1">👁</span>{{ videoInfo.views }} views</span
            >
            <span v-if="videoInfo.reactions"
              ><span class="mr-1">❤️</span
              >{{ videoInfo.reactions }} reactions</span
            >
            <span
              ><span class="mr-1">⏱</span
              >{{ formatDuration(videoInfo.duration) }}</span
            >
            <span
              ><span class="mr-1">📌</span
              >{{ videoInfo.uploader || 'Unknown' }}</span
            >
          </div>
          <!-- Format group -->
          <div class="mb-4">
            <div class="flex gap-2 mb-3 flex-wrap">
              <label v-for="tab in formatTabs" :key="tab.value">
                <input
                  v-model="selectedTab"
                  type="radio"
                  class="hidden peer"
                  name="formatGroup"
                  :value="tab.value"
                />
                <span
                  class="px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-sm cursor-pointer select-none transition peer-checked:bg-purple-600 peer-checked:text-white bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700 font-semibold shadow-sm peer-checked:shadow-md hover:ring-1 hover:ring-purple-400"
                >
                  {{ tab.label }}
                </span>
              </label>
            </div>
            <select
              v-model="selectedFormat"
              class="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition text-base"
            >
              <optgroup v-if="formatOptions.length > 8" label="Popular formats">
                <option
                  v-for="format in formatOptions.slice(0, 8)"
                  :key="format.format_id"
                  :value="format"
                >
                  {{ format.ext.toUpperCase()
                  }}<template v-if="format.resolution"
                    >- {{ format.resolution }}</template
                  ><template v-if="format.fps">- {{ format.fps }}fps</template
                  ><template v-if="format.filesize"
                    >- {{ formatFileSize(format.filesize) }}</template
                  >
                </option>
              </optgroup>
              <optgroup v-if="formatOptions.length > 8" label="More formats">
                <option
                  v-for="format in formatOptions.slice(8)"
                  :key="format.format_id"
                  :value="format"
                >
                  {{ format.ext.toUpperCase()
                  }}<template v-if="format.resolution"
                    >- {{ format.resolution }}</template
                  ><template v-if="format.fps">- {{ format.fps }}fps</template
                  ><template v-if="format.filesize"
                    >- {{ formatFileSize(format.filesize) }}</template
                  >
                </option>
              </optgroup>
              <template v-else>
                <option
                  v-for="format in formatOptions"
                  :key="format.format_id"
                  :value="format"
                >
                  {{ format.ext.toUpperCase()
                  }}<template v-if="format.resolution"
                    >- {{ format.resolution }}</template
                  ><template v-if="format.fps">- {{ format.fps }}fps</template
                  ><template v-if="format.filesize"
                    >- {{ formatFileSize(format.filesize) }}</template
                  >
                </option>
              </template>
            </select>
          </div>
        </div>
        <!-- Quick download (direct URL) -->
        <div class="flex flex-col items-stretch gap-3 mt-3">
          <a
            v-if="selectedFormat"
            :href="selectedFormat.url"
            target="_blank"
            rel="noopener"
            class="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-base shadow-lg text-center"
          >
            <span class="text-xl">⬇</span> {{ $t('downloads.quick') }}
          </a>

          <!-- Server-side download (queue + S3) -->
          <div
            class="rounded-xl border border-dashed border-purple-300 dark:border-purple-700 p-4 bg-purple-50/50 dark:bg-purple-950/20"
          >
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
              {{ $t('downloads.server_title') }}
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <select
                v-model="serverFormat"
                class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-sm"
              >
                <option value="mp4">MP4</option>
                <option value="mp3">MP3</option>
              </select>
              <select
                v-if="serverFormat === 'mp4'"
                v-model="serverResolution"
                class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-sm"
              >
                <option value="1080p">1080p</option>
                <option value="720p">720p</option>
                <option value="480p">480p</option>
                <option value="360p">360p</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-3">
              <input
                v-model="trimStart"
                type="text"
                placeholder="00:00:00"
                class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-sm"
              >
              <input
                v-model="trimEnd"
                type="text"
                placeholder="00:01:00"
                class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-sm"
              >
            </div>
            <button
              type="button"
              class="w-full py-3 rounded-lg font-bold text-white bg-gray-900 dark:bg-purple-600 hover:opacity-90 disabled:opacity-50"
              :disabled="serverLoading"
              @click="onServerDownload"
            >
              <span v-if="serverLoading">{{ $t('loading') }}</span>
              <span v-else>{{ $t('downloads.server_button') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import type { VideoFormat, VideoInfo } from '~/types/api';
import { trackDownloadEvent } from '~/composables/useDownloadAnalytics';

const props = defineProps({
  placeholder: { type: String, default: 'Paste video URL...' },
  icon: { type: String, default: 'lucide:link' },
  iconClass: {
    type: String,
    default: 'w-5 h-5 text-[#6c63ff] dark:text-white',
  },
  buttonLabel: { type: String, default: 'Get Video' },
  validate: { type: Function, default: () => true },
  initialUrl: { type: String, default: '' },
  invalidErrorKey: { type: String, default: 'error.invalid_url' },
});

const emit = defineEmits(['submit']);
const inputUrl = ref<string>('');
const error = ref<string>('');
const loading = ref<boolean>(false);
const showVideoInfo = ref<boolean>(false);
const selectedFormat = ref<VideoFormat | null>(null);
const videoInfo = ref<VideoInfo | null>(null);
const route = useRoute();
const router = useRouter();
const downloaderApi = useDownloaderApi();
const downloadsStore = useDownloadsStore();

const serverFormat = ref<'mp4' | 'mp3'>('mp4');
const serverResolution = ref('1080p');
const trimStart = ref('');
const trimEnd = ref('');
const serverLoading = ref(false);
const lastSubmittedUrl = ref('');

// UI state for format tabs
const { t } = useI18n()

const formatTabs = computed(() => [
  { label: t('formats.tab_video'), value: 'video' },
  { label: t('formats.tab_video_only'), value: 'videoOnly' },
  { label: t('formats.tab_audio_only'), value: 'audioOnly' },
])
const selectedTab = ref('video');

const formatOptions = computed(() => {
  if (!videoInfo.value) return [];
  if (selectedTab.value === 'video')
    return videoInfo.value.formats.filter((f) => f.has_video && f.has_audio);
  if (selectedTab.value === 'videoOnly')
    return videoInfo.value.formats.filter((f) => f.has_video && !f.has_audio);
  if (selectedTab.value === 'audioOnly')
    return videoInfo.value.formats.filter((f) => !f.has_video && f.has_audio);
  return [];
});

function formatFileSize(size: string | number | null | undefined): string {
  if (size == null || size === '') return '';
  const bytes = typeof size === 'number' ? size : Number.parseInt(String(size), 10);
  if (Number.isNaN(bytes)) return String(size);

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${value.toFixed(1)} ${units[unitIndex]}`;
}

function formatDuration(duration: number | string | null | undefined): string {
  const totalSeconds = typeof duration === 'number' ? duration : parseInt(String(duration));
  if (isNaN(totalSeconds)) return String(duration ?? '');

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

async function getVideoInfoAuto(url: string) {
  if (!url) return;
  if (!props.validate(url)) return;
  error.value = '';
  loading.value = true;
  showVideoInfo.value = false;
  lastSubmittedUrl.value = url;

  try {
    videoInfo.value = await downloaderApi.fetchVideoInfo(url);
    selectedFormat.value = formatOptions.value[0] ?? null;
    trackDownloadEvent('info', videoInfo.value.id);
  } catch {
    error.value = 'error.fetch_failed';
    videoInfo.value = null;
    trackDownloadEvent('error', 'error.fetch_failed');
  } finally {
    loading.value = false;
    showVideoInfo.value = !!videoInfo.value;
  }
}

async function onServerDownload() {
  const legacy = videoInfo.value?.legacy;
  if (!legacy) return;
  serverLoading.value = true;
  try {
    await downloadsStore.queue(legacy, {
      format: serverFormat.value,
      resolution: serverFormat.value === 'mp4' ? serverResolution.value : undefined,
      start_time: trimStart.value || undefined,
      end_time: trimEnd.value || undefined,
    });
    trackDownloadEvent('download', legacy.videoId);
  } catch {
    error.value = 'downloads.queue_failed';
    trackDownloadEvent('error', 'downloads.queue_failed');
  } finally {
    serverLoading.value = false;
  }
}

function onSubmit() {
  if (!inputUrl.value.trim()) {
    error.value = 'error.empty_url';
    return;
  }
  if (!props.validate(inputUrl.value.trim())) {
    error.value = props.invalidErrorKey
    return
  }
  error.value = '';
  loading.value = true;
  showVideoInfo.value = false;

  // Cập nhật query string để hỗ trợ reload/share link
  const url = inputUrl.value.trim();
  router.replace({ query: { ...route.query, url } });

  emit('submit', url);
  getVideoInfoAuto(url);
}


onMounted(() => {
  if (props.initialUrl && props.validate(props.initialUrl)) {
    inputUrl.value = props.initialUrl;
    getVideoInfoAuto(props.initialUrl);
  }
});

watch(
  () => props.initialUrl,
  (newUrl) => {
    if (newUrl && props.validate(newUrl)) {
      inputUrl.value = newUrl;
      getVideoInfoAuto(newUrl);
    }
  },
);

watch(formatOptions, (options) => {
  if (options.length && !selectedFormat.value) {
    selectedFormat.value = options[0] ?? null;
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
