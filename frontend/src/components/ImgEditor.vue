<template>
  <div class="container">
    <div class="editor-section">
      <div class="editor-header">
        <button class="btn" @click="$emit('close')"> x </button>
      </div>

      <div class="editor-body">
        <div class="editor-wrap">

          <div class="file-drop">
            📸 사진을 업로드 해주세요.<br>
            (업로드 권장 사이즈는 3:4 비율 입니다.)
            <input type="file" accept="image/*" @change="onChangeFiles" class="file-input" />
          </div>

          <div class="canvas-wrap">
            <canvas id="canvas" @mousedown="drawStart" @mousemove="draw" @mouseup="drawEnd" ref="canvas"></canvas>
            <img :src="imgUrl" class="file-img" />
          </div>

        </div>

        <div class="img-wrap">
          <canvas id="target-canvas"></canvas>
          <img class="modi-img" />
        </div>

      </div>

    </div>
  </div>
</template>

<script>

export default {
  data(){
    return  {
      vueCtx: null,
      imgUrl: null,
      isStart: false,
      minSize: 20,
      startX: null,
      startY: null,
      endX: null,
      endY: null,
      canvasX: null,
      canvasY: null,
      sourceX: 0,
      sourceY: 0,
      sourceWidth: 0,
      sourceHeight: 0,
      targetHeight: 0,
      targetWidth: 0,
    }
  },
  mounted() {
    var vueCanvas = document.getElementById('canvas')
    var ctx = vueCanvas.getContext('2d')
    this.vueCtx = ctx
  },
  methods: {
    onChangeFiles(e) {
      const file = e.target.files[0]
      this.imgUrl = URL.createObjectURL(file)
      this.msg= '' 
      this.modiMsg= ''
    },
    drawStart(e) {
      this.isStart = true

      const cX = this.$refs.canvas.getBoundingClientRect().left
      const cY = this.$refs.canvas.getBoundingClientRect().top
      this.canvasX = cX
      this.canvasY = cY
      

      this.startX = parseInt(e.clientX - this.canvasX , 10)
      this.startY = parseInt(e.clientY - this.canvasY , 10)
    },
    draw(e) {
      if(!this.isStart) {
        return
      }
      this.endX = parseInt(e.clientX - this.canvasX , 10)
      this.endY = parseInt(e.clientY - this.canvasY , 10)

      this.vueCtx.clearRect(0, 0, 400, 450)
      this.vueCtx.strokeRect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY)
    },
    drawEnd() {
      this.isStart = false

      if( 
        Math.abs(this.endX - this.startX) < this.minSize || 
        Math.abs(this.endY - this.startY) < this.minSize) {
        return
      }
      this.drawOut(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY)
    },
    drawOut(x, y, width, height) {
      console.log('로드됨')
      
      let imgWrap = document.querySelector('.img-wrap')
      let modiImg = document.querySelector('.modi-img')
      let targetCanvas = document.getElementById('target-canvas')
      let targetCtx = targetCanvas.getContext('2d')

      imgWrap.innerHTML = ''

      if(Math.abs(width) <= Math.abs(height)) {
        this.targetHeight = 450
        this.targetWidth = (this.targetHeight * width) / height
      } else {
        this.targetWidth = 400
        this.targetHeight = (this.targetWidth * height) / width
      }

      targetCanvas.width = this.targetWidth
      targetCanvas.height = this.targetHeight

      modiImg.addEventListener('load', () => {
        const buffer = modiImg.width / this.$refs.canvas.width

        this.sourceX = x * buffer
        this.sourceY = y * buffer
        this.sourceWidth = width * buffer
        this.sourceHeight = height * buffer

        targetCtx.drawImage(
          modiImg,
          this.sourceX,
          this.sourceY,
          this.sourceWidth,
          this.sourceHeight,
          0,
          0,
          this.targetWidth,
          this.targetHeight
        )
      })
      modiImg.src = this.imgUrl
      imgWrap.appendChild(targetCanvas)
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
#target-canvas {
  border: 1px solid orange;
  position: absolute;
  width: 100%;
  height: 100%;
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
        .modi-img{
          border: 1px solid black;
        }
      }
    }
  }
}
</style>