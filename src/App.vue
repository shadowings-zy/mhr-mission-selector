<template>
  <h1>《怪物猎人 崛起》任务选择器</h1>
  <h3>
    本项目是给“选择困难症/不知道该刷些什么的怪玩家”专门开发的网页程序。<br />
    用于随机选择指定星级的任务，以及随机选择指定数目的武器。<br />
  </h3>
  <div id="collapse">
    <el-collapse v-model="state.activeNames">
      <el-collapse-item title="选项" name="setting">
        <el-form
          label-position="left"
          id="form"
          label-width="80px"
          :size="state.componentSize"
        >
          <el-form-item label="任务星级">
            <el-checkbox-group v-model="state.levelCheckList">
              <el-checkbox label="7星"></el-checkbox>
              <el-checkbox label="6星"></el-checkbox>
              <el-checkbox label="5星"></el-checkbox>
              <el-checkbox label="4星"></el-checkbox>
              <el-checkbox label="3星"></el-checkbox>
              <el-checkbox label="2星"></el-checkbox>
              <el-checkbox label="1星"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="武器数量">
            <el-input-number
              v-model="state.weaponNum"
              :min="1"
              :max="14"
              label="武器种类"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <el-button
          class="select-button"
          type="primary"
          :disabled="state.levelCheckList.length === 0"
          @click="getRandomMissionAndWeapon"
          >选择任务</el-button
        >
      </el-collapse-item>
      <el-collapse-item title="结果" name="output">
        <div id="output">
          <h4 v-if="state.mission.name !== '' && state.weapon.length !== 0">
            任务：【{{ state.mission.level }}】 {{ state.mission.name }}
            {{ state.mission.description }}
            <br />
            武器：{{ state.weapon }}
          </h4>
          <h4 v-else>暂无结果，请点击“选择任务”按钮</h4>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { shuffleArray, getWindowWidthAndHeight } from "./util";
import missionList from "./data/mission.json";
import weaponList from "./data/weapon.json";

const MINI_MAX_WIDTH = 400;
const SMALL_MAX_WIDTH = 800;

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
  componentSize: "medium",
  activeNames: ["setting", "output"],
});

const getRandomMission = () => {
  const targetMissionList = missionList.filter((item) =>
    state.levelCheckList.includes(item.level)
  );
  const randomIndex = Math.floor(Math.random() * targetMissionList.length);
  state.mission = targetMissionList[randomIndex];
};

const getRandomWeapon = () => {
  const shuffledArr = shuffleArray(weaponList);
  state.weapon = shuffledArr.slice(0, state.weaponNum).join("、");
};

const getRandomMissionAndWeapon = () => {
  getRandomMission();
  getRandomWeapon();
};

onMounted(() => {
  console.log(
    "本项目已开源，地址为：",
    "https://github.com/shadowings-zy/mhr-mission-selector"
  );

  const { width } = getWindowWidthAndHeight();
  if (width < MINI_MAX_WIDTH) {
    state.componentSize = "mini";
  } else if (width >= MINI_MAX_WIDTH && width < SMALL_MAX_WIDTH) {
    state.componentSize = "small";
  } else {
    state.componentSize = "medium";
  }
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px 20px;
}

#collapse {
  width: calc(100vw - 90px);
  padding: 24px;
  max-width: 760px;
  margin: 40px auto;
  border: 1px solid #ebeef5;
}

#form {
  padding: 10px 10px 20px 10px;
  text-align: left;
}

#output {
  margin: 40px auto;
  width: 80%;
}

.select-button {
  width: 200px;
}
</style>