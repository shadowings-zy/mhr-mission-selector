<template>
  <h1>《怪物猎人 崛起》任务选择器</h1>
  <h2>点击“选择”按钮，随机选择任务和武器</h2>
  <div id="select">
    <h3 class="select-item">
      <p class="select-title">星级选择：</p>
      <el-checkbox-group class="select-content" v-model="state.levelCheckList">
        <el-checkbox label="7星"></el-checkbox>
        <el-checkbox label="6星"></el-checkbox>
        <el-checkbox label="5星"></el-checkbox>
        <el-checkbox label="4星"></el-checkbox>
        <el-checkbox label="3星"></el-checkbox>
        <el-checkbox label="2星"></el-checkbox>
        <el-checkbox label="1星"></el-checkbox>
      </el-checkbox-group>
    </h3>
    <h3 class="select-item">
      <p class="select-title">武器数量：</p>
      <el-input-number
        class="select-content"
        v-model="state.weaponNum"
        :min="1"
        :max="14"
        label="武器种类"
      ></el-input-number>
    </h3>
    <h3 class="select-item">
      <el-button
        class="select-button"
        type="primary"
        :disabled="state.levelCheckList.length === 0"
        @click="getRandomMissionAndWeapon"
        >选择</el-button
      >
    </h3>
  </div>
  <div
    id="output"
    v-if="state.mission.name !== '' && state.weapon.length !== 0"
  >
    <h4>
      任务：【{{ state.mission.level }}】 {{ state.mission.name }}
      {{ state.mission.description }}
    </h4>
    <h4>武器：{{ state.weapon }}</h4>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { shuffleArray } from "./util";
import missionList from "./data/mission.json";
import weaponList from "./data/weapon.json";

const state = reactive({
  weapon: "",
  weaponNum: 1,
  mission: {
    name: "",
    description: "",
    level: -1,
  },
  levelDescriptionList: ["1星", "2星", "3星", "4星", "5星", "6星", "7星"],
  levelCheckList: ["4星", "5星", "6星", "7星"],
});

const getRandomMission = () => {
  console.log("getRandomMission");
  const targetMissionList = missionList.filter((item) =>
    state.levelCheckList.includes(item.level)
  );
  console.log("levelCheckList: ", state.levelCheckList);
  console.log("targetMissionList: ", targetMissionList);
  const randomIndex = Math.floor(Math.random() * targetMissionList.length);
  state.mission = targetMissionList[randomIndex];
};

const getRandomWeapon = () => {
  console.log("getRandomWeapon");
  const shuffledArr = shuffleArray(weaponList);
  state.weapon = shuffledArr.slice(0, state.weaponNum).join("、");
};

const getRandomMissionAndWeapon = () => {
  getRandomMission();
  getRandomWeapon();
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#select {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#output {
  border: 1px solid #2c3e50;
  border-radius: 4px;
  margin: 80px auto;
  width: 80%;
}

.select-item {
  margin: 15px auto;
  display: flex;
  flex-direction: row;
}

.select-title {
  height: 40px;
  line-height: 40px;
  margin: 0;
}

.select-content {
  height: 40px;
  line-height: 40px;
  margin: 0 0 0 10px;
}

.select-button {
  width: 200px;
  margin: 0 auto;
}
</style>