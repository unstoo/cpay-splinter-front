// for (var i = 0, j = 0; i < 5; i++) {
//   setTimeout(function() { console.log(j) }, 0)
//   console.log(j)
// }


function sr(str, n = 0) {
  var store = ''

  if (n < str.length - 1) 
    store += sr(str, n + 1)
    

  return store + str[n]
}


function sum(...args) {
  
  const a = [...args]

  var res = a.reduce((accum, arg) => {
      if (Array.isArray(arg)) {
        return accum + sum(...arg)
      } else {
        return accum + arg
      }
  }, 0)

  return res
}

var arr = [1,2,3,4,5,6,7,8]

console.log(sum(arr))