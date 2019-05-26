<template>
  <div class="error">
    <h1>远方...</h1>
    <h3>一个无法到达的地方！</h3>
    <nuxt-link to="/"><p>权限不足，返回首页</p></nuxt-link>
  </div>
</template>
<style scoped>
.error {
  background-color: #416475;
  height: 100%;
  overflow: hidden;
  text-align: center;
}
h1{
    color: #ffb485;
    font-size: 55px;
    margin-top: 200px;display: inline-block;
}
.error > h1:nth-of-type(1) {
  color: #d1f2a5;
  animation: colordancing 4s infinite;
}
h3{
    display: inline-block;
}
a{
    
    text-decoration:none;
}
p{margin-top: 50px;
    color: rgba(50, 146, 175, 0.89);
}
.error > h1:nth-of-type(3) {
  color: #f56991;
  animation: colordancing2 4s infinite;
}
.error > h1:nth-of-type(2) {
  width: 120px;
  height: 120px;
  border-radius: 999px;
}
.error > h1:nth-of-type(2):before,
.error > h1:nth-of-type(2):after {
  border-radius: 0%;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  border-radius: 999px;
  box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
    inset 0 30px 0 rgba(239, 250, 180, 0.4),
    inset -30px 0 0 rgba(255, 196, 140, 0.4),
    inset 0 -30px 0 rgba(245, 105, 145, 0.4);
  animation: shadowsdancing 4s infinite;
}
.error > h1:nth-of-type(2):before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}

@keyframes shadowsdancing {
  0% {
    box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 30px 0 rgba(239, 250, 180, 0.4),
      inset -30px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 -30px 0 rgba(245, 105, 145, 0.4);
  }
  25% {
    box-shadow: inset 30px 0 0 rgba(245, 105, 145, 0.4),
      inset 0 30px 0 rgba(209, 242, 165, 0.4),
      inset -30px 0 0 rgba(239, 250, 180, 0.4),
      inset 0 -30px 0 rgba(255, 196, 140, 0.4);
  }
  50% {
    box-shadow: inset 30px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 30px 0 rgba(245, 105, 145, 0.4),
      inset -30px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 -30px 0 rgba(239, 250, 180, 0.4);
  }
  75% {
    box-shadow: inset 30px 0 0 rgba(239, 250, 180, 0.4),
      inset 0 30px 0 rgba(255, 196, 140, 0.4),
      inset -30px 0 0 rgba(245, 105, 145, 0.4),
      inset 0 -30px 0 rgba(209, 242, 165, 0.4);
  }
  100% {
    box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 30px 0 rgba(239, 250, 180, 0.4),
      inset -30px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 -30px 0 rgba(245, 105, 145, 0.4);
  }
}
@keyframes colordancing {
  0% {
    color: #d1f2a5;
  }
  25% {
    color: #f56991;
  }
  50% {
    color: #ffc48c;
  }
  75% {
    color: #effab4;
  }
  100% {
    color: #d1f2a5;
  }
}
@keyframes colordancing2 {
  0% {
    color: #ffc48c;
  }
  25% {
    color: #effab4;
  }
  50% {
    color: #d1f2a5;
  }
  75% {
    color: #f56991;
  }
  100% {
    color: #ffc48c;
  }
}
</style>
