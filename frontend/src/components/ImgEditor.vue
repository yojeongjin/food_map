<template>
  <div class="container">
    <div class="editor-section">
      <div class="editor-header">
        <button class="btn" @click="$emit('close')"> X </button>
      </div>

      <div class="editor-body">
        <div class="editor-wrap">

          <div class="file-drop">
            📸 사진을 업로드 해주세요.<br>
            (업로드 권장 사이즈는 3:4 비율 입니다.)
            <input type="file" accept="image/*" @change="onChangeFiles" class="file-input" />
          </div>

          <div class="canvas-wrap">
            <canvas id="canvas"></canvas>
            <img :src="imgUrl" class="file-img" />
          </div>

        </div>

        <div class="img-wrap">

        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return  {
      imgUrl: null,
      isStart: false,
      startX: null,
      startY: null,
      endX: null,
      endY: null,
      canvas: null
    }
  },
  mounted() {
    let c = document.getElementById("canvas")
    let ctx = c.getContext("2d")
    this.vueCanvas = ctx
  },
  methods: {
    onChangeFiles(e) {
      const file = e.target.files[0]
      this.imgUrl = URL.createObjectURL(file)
      this.msg= '' 
      this.modiMsg= ''
    },
    drawStart(e) {
      // const canvasX = this.$refs.canvas.getBoundingClientRect().left
      // const canvasY = this.$refs.canvas.getBoundingClientRect().top
      // this.startX = parseInt(e.clinetX - canvasX, 10)
      // this.startY = parseInt(e.clinetY - canvasY, 10)
      console.log(e)
    }

  }
}
</script>

<style lang="scss" scoped>
#canvas {
  border: 1px solid red;
  position: absolute;
  width: 100%;
  height: 90%;
}
.container {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  .editor-section {
    position: relative;
    width: 900px;
    height: 600px;
    margin: auto;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;
    .editor-header {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .btn {
        background-color: transparent;
        border: 1px solid black;
        border-radius: 50%;
        padding: 3px 6px;
        cursor: pointer;
      }
    }
    .editor-body {
      margin: 5px;
      display: flex;
      .editor-wrap {
        border: 1px solid black;
        position: relative;
        width: 400px;
        height: 500px;
        margin: 0 20px;
        .canvas-wrap {
          width: 100%;
          height: 90%;
          .file-img {
            width: 100%;
            height: 100%;
          }
        }
        .file-drop {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 50px;
          font-size: 13px;
          border: 1px dashed #c8c8c8;
          .file-input {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            cursor: pointer;
            opacity: 0;
          }
        }
      }
      .img-wrap {
        border: 1px solid black;
        position: relative;
        width: 400px;
        height: 500px;
        margin: 0 20px;
      }
    }
  }
}
</style>