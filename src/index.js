module.exports = function check(str, bracketsConfig) {
  let checkObject = Object.fromEntries(Object.entries(Object.fromEntries(bracketsConfig)).map(([key,value])=>[value,key]));
  let checkOpenBrakets = Object.values(checkObject);
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    let x = str[i];
    if (checkOpenBrakets.includes(x)) {
      if (x === checkObject[x]) {
        if (stack.length !== 0) {
          let topE = stack[stack.length - 1];
          if (x === topE) {
            stack.pop();
          } else {
            stack.push(x);
          }
        } else {
          stack.push(x);
        }
      } else {
        stack.push(x);
      }
    } else {
      if (stack.length === 0) {
        return false;
      } 
      let topE = stack[stack.length - 1];
      if (checkObject[x] === topE) {
        stack.pop();
      } else {
        return false;
      }
    }
  } 
  if (stack.length === 0) {
    return true
  } else {
    return stack.length % 2 === 0
  }
}
