'use strict'
 
const watermark = {}
 
// 参数1-检测的节点 参数2-防止被删除的水印节点 参数3-水印文字 参数4-要加水印的节点
const domMutations = (dom,dom2, str, container)=>{
  let observer = new MutationObserver(callback)
  function callback(changeNodeArr){
    changeNodeArr.forEach((changeNode)=>{
      let nodes = Array.from(changeNode.removedNodes);
      let directMatch = nodes.indexOf(dom2) > -1
      // 如果水印节点被删除，重绘
      if (directMatch) {
        observer.disconnect()
        observer.takeRecords()
        setWatermark(str, container)
      }else if(dom==dom2){
        observer.takeRecords()
        setWatermark(str, container,"dom")
      }
    })
  }
  observer.observe( dom, {childList: true, attributes:true})
}


/**
 *
 * @param {要设置的水印的内容} str
 * @param {需要设置水印的容器} container
 */
const setWatermark = (str, container,type="all") => {
    console.log(container);
//   const id = container.__vue__._uid
  const id = "setWatermark"+Math.random()
 
  if (container === undefined) {
    return
  }
 
  // 查看页面上有没有，如果有则删除
  if (document.getElementById(id) !== null) {
    const childelement = document.getElementById(id)
    childelement.parentNode.removeChild(childelement)
  }
 
  var containerWidth = container.offsetWidth // 获取父容器宽
  var containerHeight = container.offsetHeight // 获取父容器高
  container.style.position = 'relative' // 设置布局为相对布局
  // 创建canvas元素(先制作一块背景图)
  const can = document.createElement('canvas')
  can.width = 400 // 设置每一块的宽度
  can.height = 300 // 高度
  const cans = can.getContext('2d') // 获取canvas画布
  cans.rotate(-16 * Math.PI / 180) // 逆时针旋转
  cans.font = '12px Microsoft Yahei' // 设置字体
  cans.fillStyle = '#00000019' // 设置字体的颜色
  cans.textAlign = 'left' // 文本对齐方式
  cans.textBaseline = 'Middle' // 文本基线
  cans.fillText(str, 0, 4 * can.height / 5) // 绘制文字
 
  // 创建一个div元素
  const div = document.createElement('div')
  div.id = id // 设置id
  div.style.pointerEvents = 'none' // 取消所有事件
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.width =  '100vw'
  div.style.height =  '100vh'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  container.appendChild(div) // 追加到页面

  // 水印节点被修改后重新启动检测
  if(type=="dom"){
    domMutations(document.getElementById(id),document.getElementById(id),str, container)
  }else{
    domMutations(document.getElementById(id),document.getElementById(id),str, container)
    domMutations(container,document.getElementById(id),str,container)
  }
  
  return id
}



watermark.set = (str, container) => {
  setWatermark(str, container)
//   let id = setWatermark(str, container)
//   setInterval(() => {
//     if (document.getElementById(id) === null) {
//       id = setWatermark(str, container)
//     }
//   }, 500)
// 监听页面大小的变化（暂不需要）,模态框不会因页面变化而变化
//   window.onresize = () => {
//     setWatermark(str, container)
//   }
}
 
export default watermark