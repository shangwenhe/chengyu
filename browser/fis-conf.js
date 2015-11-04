// default settings. fis3 release

var fs = require('fs');
var mFs = require('fs');



// Global start
fis.hook('module', {
    mode: 'commonJS'
});
fis.set('namespace', 'chengyu');
fis.set('project.ignore', [
        'fis-conf.js',
        '*.sh',
        '*.md',
        '*.py',
        '*.info',
        '*.bat',
        'output/*',
        'test/*'
    ])
    .match('**.tmpl', {
        parser: fis.plugin('utc'),
        isJsLike: true,
        release: function (arg) {
            var readStream = mFs.createReadStream('.' + arg[0]);
            mFs.unlink('../server/browser/tmpl/' + arg[0], function () {
                var writeStream = mFs.createWriteStream('../server/browser/tmpl/' + arg[0]);
                readStream.pipe(writeStream);
                readStream.on('end', function () {
                    console.log('copy end');
                });
                readStream.on('error', function () {
                    console.log('copy error');
                });

            });
        },
        rExt: '.tmpl'
    });

fis.match('::image', {
    useHash: true
});
fis.match('**', {
    domain: '.'
});

fis.match('**.js', {
    isMod: true, // 标记为组件
    useHash: true,
    useMap: true,
    requires: [
        'chengyu:static/mod/mod.js',
        'chengyu:components/jquery/jquery.js',
        'chengyu:components/underscore/underscore.js',
        'chengyu:static/Event/Event.js'
    ]
});

// 手动添加保证加载顺序
fis.match('{mod,jquery,underscore}.js', {
    isMod: false, // 标记为非组件
    packOrder: -100,
    requires: []
});
fis.match('jquery.js', {
    packOrder: -99
});
fis.match('underscore.js', {
    packOrder: -98
});
fis.match('Event.js', {
    isMod: true, // 标记为非组件
    packOrder: -97,
    requires: [
        'chengyu:static/mod/mod.js'
    ]
});

fis.match('**.less', {
    useHash: true,
    parser: fis.plugin('less'),
    rExt: '.css',
    requires: [
        'chengyu:static/reset.less',
    ]
});
fis.match('**.css', {
    useHash: true,
    requires: [
        'chengyu:static/reset.less',
    ]
});

fis.match('/page/(**.html)', {
    release: '${namespace}/$1'
});
fis.match('**.png', {
    useHash: true,
    optimizer: fis.plugin('png-compressor')
});
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true // 资源映射表内嵌

    })
});

// 文件发布地址
fis.match('**.{less,css}', {
        deploy: fis.plugin('local-deliver', {
            to: '../server/browser/public/'
        })
    })
    .match('**.js', {
        deploy: fis.plugin('local-deliver', {
            to: '../server/browser/public/'
        })
    })
    .match('page/**.html', {
        deploy: fis.plugin('local-deliver', {
            to: '../server/browser/views/'
        })
    })
    .match('**.tmpl', {
        deploy: fis.plugin('local-deliver', {
            to: '../server/browser/tmpl/'
        })
    })
    .match('*.{eot,svg,ttf,woff,woff2}', {
        deploy: fis.plugin('local-deliver', {
            to: '../server/browser/public/font/'
        })
    });




// Global end

// default media is `dev`
fis.media('dev')
    .match('/{static,components}/**.js', {
        useHash: false
    })
    .match('/widget/**.js', {
        useHash: false
    })
    .match('/**.less', {
        useHash: false
    });

// extends GLOBAL config
fis.media('pro')
    .match('/{static,components}/**.js', {
        optimizer: fis.plugin('uglify-js'),
        packTo: '/pkg/static.js'
    })
    .match('/widget/**.js', {
        optimizer: fis.plugin('uglify-js'),
        packTo: '/pkg/widget.js'
    })
    .match('/{static,components}/**.{less,css}', {
        optimizer: fis.plugin('clean-css'),
        packTo: '/pkg/static.css'
    })
    .match('/widget/**.{less,css}', {
        optimizer: fis.plugin('clean-css'),
        packTo: '/pkg/widget.css'
    });
