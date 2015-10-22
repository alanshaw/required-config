var objectPath = require('object-path')

module.exports = function (base, merged) {
  if (!merged) merged = base
  var paths = findRequiredPaths(base)
  checkRequired(merged, paths)
}

function isRequired (val) {
  if (Object.prototype.toString.call(val) === '[object String]') {
    if (val[0] === '<' && val[val.length - 1] === '>') {
      return true
    }
  }
  return false
}

function findRequiredPaths (obj, currentPath) {
  currentPath = currentPath || []
  var foundPaths = []

  if (Object.prototype.toString.call(obj) === '[object Object]') {
    Object.keys(obj).forEach(function (key) {
      foundPaths = foundPaths.concat(findRequiredPaths(obj[key], currentPath.concat(key)))
    })
  } else if (Array.isArray(obj)) {
    obj.forEach(function (obj, i) {
      foundPaths = foundPaths.concat(findRequiredPaths(obj, currentPath.concat(i)))
    })
  } else if (isRequired(obj)) {
    foundPaths.push(currentPath)
  }

  return foundPaths
}

module.exports.findRequiredPaths = findRequiredPaths

// Required config values look like "<A VALUE>"
// Throws if a required path is undefined, null or ""
function checkRequired (obj, paths) {
  paths.forEach(function (p) {
    var value = objectPath.get(obj, p)

    if (value == null || value === '' || isRequired(value)) {
      throw new Error('Configuration value for path ' + p.join('.') + ' missing')
    }
  })
}

module.exports.checkRequired = checkRequired
