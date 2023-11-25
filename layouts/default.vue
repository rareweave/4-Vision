<template>
  <div v-if="startScreen">
    <input
      type="checkbox"
      id="connectWallet"
      class="modal-toggle"
      :checked="startScreen"
    />

    <div class="modal">
      <div class="modal-box w-2/5 h-2/3 text-center">
        <div class="py-4 flex justify-center">
          <svg
            class="h-15 me-3 sm:h-20"
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
            class="self-center text-5xl font-semibold whitespace-nowrap text-white text-center"
            ><span class="">4</span> Vision</span
          >
        </div>
        <h1 class="text-4xl font-bold text-white">Project Selector</h1>
        <div class="py-4 flex text-center">
          <ul class="space-y-2 font-medium mb-1 mx-auto">
            <li>
              <div v-for="(project, index) in projects" :key="index">
                <button
                  @click.prevent.stop="loadProject(project.name)"
                  class="flex justify-center sideButton p-2 mt-2 rounded-lg text-white text-xl w-[200px] mx-auto"
                >
                  {{ project.name }}
                </button>
              </div>

              <div class="flex items-center justify-center">
                <label
                  class="sideButton p-2 mt-4 rounded-lg text-white text-xl w-[150px] mx-auto text-[32px] text-center"
                  for="create-modal"
                >
                  +
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <input
      type="checkbox"
      id="create-modal"
      class="modal-toggle"
      :checked="false"
      v-model="createModalOpened"
    />
    <div class="modal">
      <div class="modal-box w-2/12 h-1/5 flex flex-col">
        <label for="create-modal" class="btn btn-sm absolute right-2 top-2"
          >✕</label
        >
        <h3 class="font-bold text-lg text-center">Create Project</h3>
        <form class="modal-action" @submit.prevent="projectCreate">
          <input
            v-model="projectName"
            class="input input-bordered w-full rounded-lg p-2"
            type="text"
            required
            placeholder="Project Name"
          />
          <button type="submit" class="btn btn-primary rounded-lg">
            Create
          </button>
        </form>
      </div>
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script setup>
import { fileTree } from "../core/fileTree";

let currentProjectName = useState("projectName", () => null);
let createModalOpened = ref(false);
let projectName = ref("");
let projects = ref([]);
let startScreen = ref(true);

if (!("indexedDB" in window)) {
  alert("This browser doesn't support IndexedDB");
}

onMounted(loadProjects);

async function loadProjects() {
  const projectList = await indexedDB.databases();
  projects.value = projectList.filter((file) => file.name !== "state");
}

async function projectCreate() {
  let newDB = new fileTree(projectName.value);
  await newDB._init();
  await addFilesToDB(newDB);
  await loadProjects();
  createModalOpened.value = false;
}

async function loadProject(projectName) {
  currentProjectName.value = projectName;
  startScreen.value = false;
}

async function addFilesToDB(db) {
  await db.addFiles([
    {
      name: "coolFunction",
      data: `(state, action) => {
  // Function logic here
}`,
    },
    {
      name: "state",
      data: `{}`,
    },
  ]);
}
</script>

<style scoped>
.brand {
  color: #0984fb;
}

.brand-background {
  background-color: #0984fb;
}

.sideButton {
  background-color: #0984fb;
  transition: background-color 0.25s ease;
}

.sideButton:hover {
  background-color: #0984fb;
}
</style>
