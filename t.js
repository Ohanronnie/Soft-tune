function sum(a,b){
    return !b && !a ? null : a+b;
}
console.log(
sum.call(this,9,7));
