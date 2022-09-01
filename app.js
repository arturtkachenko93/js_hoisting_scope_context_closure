/* SCOPE */

console.log(`x is ${x}`)

//x is undefined
var x
console.log(`x is ${x}`)
//x is undefined

x = 5
console.log(`x is ${x}`)
// x = 5

// sayHello()
var sayHello = function() {
  console.log('Hello')
}
// sayHello is not a function

//scope -- определяет, к каким переменным и функциям имеется доступ.
//глобальный scope создаётся движком js
//локальный scope -- создаёт блок кода { .. } -- это функция/условие/цикл


/* CONTEXT */

//глобальный context создаётся движком js -- this
//контекст функции создаётся в момент её выполнения ---> !!!у стрелочных функций контекст создаётся в момент объявления
//this -- указывает на объект, которому принадлежит исполняемый код

var globalThis = this
function funcFoo() {
  console.log('globalThis -->', globalThis) //window
  console.log('this inside  -->', this) //window
  console.log(globalThis === this) //true
}

funcFoo()

var obj = {
  funcFoo:  function() {
    console.log('globalThis -->', globalThis) //window
    console.log('this inside  -->', this) //obj
    console.log(globalThis === this) //false
  }
}

obj.funcFoo()

var obj2 = {
  funcFoo: function() {
    console.log(this)
  }
}

var myFunc = obj2.funcFoo
myFunc() // this -- window --> из-за того, что мы переопределили вызво ф-ии

var obj3 = {
  myMethod: function() {
    var that = this
    myFunc()

    function myFunc() {
      console.log('this -->', this)
      console.log('that -->', that)
    }
  }
}

obj3.myMethod()

/* CLOSURE */

//замыкание -- способ сохранения внешнего контекста, когда он уже удалён

var a = 'global'

function outer() {
  var b = 'outer'

  return function() {
    var c = 'inner'
    console.log('a', a) //global
    console.log('b', b) // outer
    console.log('c', c) // inner
  }
}

var innerFunc = outer() //за счет передачи по ссылке scope внешней ф-ии не удаляется
innerFunc() //таким образом, при вызове внутренней ф-ии outer мы получаем доступ ко всем переменным.

const add = (function () {
  let counter = 0;
  return () => {
    return ++counter
  }
})()

console.log(add()) //counter === 1
console.log(add()) //counter === 2
console.log(add()) //counter === 3