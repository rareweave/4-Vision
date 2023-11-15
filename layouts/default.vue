<template>
  <div v-if="startScreen">
    <input
      type="checkbox"
      id="connectWallet"
      class="modal-toggle"
      :checked="startScreen"
    />

    <div class="modal">
      <div class="modal-box">
        <div class="py-4 flex justify-center">
          <div
            class="card card-compact m-2 w-1/3 bg-base-200 cursor-pointer"
            @click="newProject"
          >
            <div class="card-body w-full flex bg-neutral">
              <h2 class="card-title w-full block text-center font-mono">
                Start Fresh
              </h2>
            </div>
          </div>
          <!-- ArConnect uses own encryption method, which is not normal RSA encryption and not compatible with most software -->
          <div
            class="card card-compact m-2 w-1/3 bg-base-200 cursor-pointer"
            @click="startLastSave"
          >
            <div class="card-body w-full flex bg-neutral">
              <h2 class="card-title w-full block text-center font-mono">
                Use last
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script setup>
import { fileTree } from "../core/fileTree";
let startScreen = ref(true);

let db = new fileTree("Functions");

if (!("indexedDB" in window)) {
  alert("This browser doesn't support IndexedDB");
}

async function newProject() {
  await db.deleteFiles();
  await db._init();

  await db.addFiles([
    {
      name: "balance",
      data: `module.exports = async function (state, action) {
  return "hi"
}`,
    },
    {
      name: "state",
      data: `{}`,
    },
  ]);

  startScreen.value = false;
}

async function startLastSave() {
  startScreen.value = false;
}

async function loadArweaveTx() {}
</script>
