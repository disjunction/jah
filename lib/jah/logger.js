var colors = require('colors')
  , sys    = require('sys')

var colourMap = { magenta: 'cyan'
                , info:    'green'
                , notice:  'cyan'
                , warn:    'yellow'
                , error:   'red'
                }

exports.ENABLE_DEBUG = false

function log_msg(type, label, message, align) {
    var output = ''

    if (arguments.length == 1) {
        message = type
        type = label = null
    }
    else if (arguments.length == 2) {
        message = label
        label = type
        type = null
    }

    if (!align && align !== 0) {
        align = 15
    }

    if (label) {
        var labelLen = label.replace(/\033\[.*?m/g, '').length
        label += ': '
        if (labelLen < align) {
            label += (new Array(align - labelLen).join(' '))
        }
        if (label && type) {
            output += '  ' + label[colourMap[type]]
        } else if (label) {
            output += '  ' + label
        }
    }

    output += message
    return sys.puts(output)
}

exports.log = function (label, message) {
    if (arguments.length == 0) {
        message = ''
        label = null
    } else if (arguments.length == 1) {
        message = label
        label = null
    }
    return log_msg(label, message)
}
exports.info = function (label, message) {
    return log_msg('info', label, message)
}
exports.warn = function (label, message) {
    return log_msg('warn', label, message)
}
exports.error = function (label, message) {
    return log_msg('error', label, message)
}
exports.notice = function (label, message) {
    return log_msg('notice', label, message)
}
exports.debug = function (label, message) {
    if (exports.ENABLE_DEBUG) {
        return log_msg('debug', label, message)
    } else {
        return;
    }
}