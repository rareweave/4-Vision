<template>
  <button
    data-drawer-target="default-sidebar"
    data-drawer-toggle="default-sidebar"
    aria-controls="default-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto sidebar">
      <a class="flex items-center mb-5 place-content-center">
        <svg
          class="h-6 me-3 sm:h-7"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z"
              stroke="#0984fb"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap text-white text-center"
          ><span class="">4</span> Vision</span
        >
      </a>
      <div>
        <div class="pb-3 pt-3 explorer dark:text-white">
          <h1 class="text-lg font-bold">FUNCTION EXPLORER</h1>
        </div>
        <ul class="space-y-2 font-medium mb-1 mx-auto">
          <li v-if="files?.length">
            <div
              v-for="(file, index) in files.filter(
                (file) => file.name !== 'state'
              )"
              :key="index"
              class="group relative"
            >
              <button
                @click.prevent.stop="loadFunc(file.name, 'javascript')"
                :class="[
                  'flex text-lg group place-content-center sideButton pt-1 mt-2 pb-1 rounded-lg text-white text-xl w-full justify-center mx-auto',
                  { selected: currentFile === file.name },
                ]"
              >
                {{ file.name }}
              </button>
              <button
                @click.prevent.stop="deleteFunc(file.name)"
                class="invisible group-hover:visible absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                X
              </button>
            </div>
          </li>
          <li v-else>
            <div class="group relative">
              <p>No Functions</p>
            </div>
          </li>
        </ul>

        <ul class="space-y-2 font-medium mt-5 mx-auto w-full">
          <label
            for="create-modal"
            class="flex text-gray-900 rounded-lg text-lg place-content-center text-white cursor-pointer text-center w-24 text-xl p-1 brand-background rounded-lg mx-auto text-[32px]"
          >
            +
          </label>
        </ul>
      </div>

      <div class="mt-10">
        <div class="pb-3 pt-3 explorer dark:text-white">
          <h1 class="text-lg font-bold">CONTRACT SETTINGS</h1>
        </div>
        <ul class="space-y-2 font-medium mb-1">
          <li>
            <button
              @click.prevent.stop="loadFunc('state', 'json')"
              :class="[
                'flex items-center text-gray-900 w-full text-lg group rounded-lg place-content-center sideButton text-white text-center text-xl p-1 mt-2',
                { selected: currentFile === 'state' },
              ]"
            >
              State
            </button>
            <button
              class="flex items-center text-gray-900 w-full text-lg group rounded-lg place-content-center sideButton text-white text-center text-xl p-1 mt-2"
            >
              Plugins
            </button>
          </li>
        </ul>
      </div>
      <div class="mt-10">
        <div class="pb-3 pt-3 explorer dark:text-white">
          <h1 class="text-lg font-bold">Deployment</h1>
        </div>
        <ul class="space-y-2 font-medium mb-1">
          <li>
            <button
              class="flex items-center text-gray-900 w-full text-lg group rounded-lg place-content-center sideButton text-white text-center text-xl p-1 mt-2"
            >
              Deploy
            </button>
            <button
              class="flex items-center text-gray-900 w-full text-lg group rounded-lg place-content-center sideButton text-white text-center text-xl p-1 mt-2"
            >
              Interact
            </button>
          </li>
        </ul>
      </div>
    </div>
  </aside>

  <input
    type="checkbox"
    id="create-modal"
    class="modal-toggle"
    :checked="false"
    v-model="createModalOpened"
  />
  <div class="modal">
    <div class="modal-box relative flex flex-col">
      <label for="create-modal" class="btn btn-sm absolute right-2 top-2"
        >✕</label
      >
      <h3 class="font-bold text-lg text-center">Create Function</h3>
      <form class="modal-action" @submit.prevent="createFunc">
        <input
          v-model="fileName"
          class="input input-bordered w-full rounded-lg p-2"
          type="text"
          required
          placeholder="Function name (ex: transfer)"
        />
        <button type="submit" class="btn btn-primary rounded-lg">Create</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { fileTree } from "../core/fileTree";
import { useProjectName } from "../composables/useState";

// Declare refs
const projectName = useProjectName();
const files = ref();
const createModalOpened = ref(false);
const fileName = ref("");
const currentFile = ref("");

// Initialize fileTree
const db = new fileTree(projectName.value);
await db._init();

// Define emits
const emit = defineEmits(["loadFile"]);

// Load files on mount
onMounted(loadFuncs);

// Function to create a new file
async function createFunc() {
  createModalOpened.value = false;
  await db.addFiles([
    {
      name: fileName.value,
      data: `(state, action) => {
  // Function logic here
}`,
    },
  ]);
  await loadFuncs();
  await loadFunc(fileName.value, "javascript");
}

// Function to load a specific file
async function loadFunc(fileName, fileType) {
  currentFile.value = fileName;
  emit("loadFile", fileName, fileType);
}

// Function to delete a specific file
async function deleteFunc(fileName) {
  try {
    await db.deleteFile(fileName);
    // Reloads all the functions in the list
    await loadFuncs();
    // Loads the first function in the list
    await loadFunc(files.value[0].name, "javascript");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

// Function to load all files
async function loadFuncs() {
  try {
    files.value = await db.getFiles();
    currentFile.value = files.value[0].name;
  } catch (error) {
    console.error("Error loading files:", error);
  }
}
</script>

<style scoped>
.brand {
  color: #0984fb;
}

.brand-background {
  background-color: #0984fb;
}

.explorer {
  background-color: #111;
}

.sideButton {
  background-color: #222;
  transition: background-color 0.25s ease;
}

.sideButton:hover {
  background-color: #0984fb;
}

.sidebar {
  background-color: #111;
}

.selected {
  background-color: #0984fb;
}

.delete-icon {
  display: none;
  margin-left: 8px;
  cursor: pointer;
}

.delete-icon:hover .delete-icon {
  display: inline;
}
</style>
