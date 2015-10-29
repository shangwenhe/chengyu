// default settings. fis3 release

// Global start
fis.hook('module', {
        mode: 'commonJS'
    })
    .set('namespace', 'chengyu')
    .set('project.ignore', [
        'fis-conf.js',
        '*.sh',
        '*.md',
        '*.py',
        '*.info',
        '*.bat',
        'output/**',
        'test/**'
    ])
    .match('*.tmpl', {
        parser: fis.plugin('utc'),
        isJsLike: true,
        release: false
    });

fis.match('::image', {
    useHash: true
});

fis.match('*.js', {
    isMod: true, // 标记为组件
    useHash: true,
    useMap: true,
    requires: [
        'chengyu:static/mod/mod.js',
        'chengyu:static/jquery/jquery.js',
        'chengyu:static/underscore/underscore.js',
        'chengyu:static/Event/Event.js',
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

fis.match('*.less', {
    useHash: true,
    parser: fis.plugin('less'),
    rExt: '.css',
    requires: [
        'chengyu:static/reset.less',
    ]
});

fis.match('*.png', {
    useHash: true,
    optimizer: fis.plugin('png-compressor')
});
fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        // allInOne: true,
        useInlineMap: true // 资源映射表内嵌

    })
});
fis.match('/page/(*.html)', {
    release: '/${namespace}/$1'
});

// Global end

// default media is `dev`
fis.media('dev')
    .match('*', {
        domain: '.'
    })
    .match('*', {
        useHash: false,
        optimizer: null //,
            // deploy: fis.plugin('local-deliver', {
            //     to: './output'
            // })
    });

// extends GLOBAL config
fis.media('pro')
    .match('*', {
        domain: '.'
    })
    .match('/static/**.js', {
        optimizer: fis.plugin('uglify-js'),
        packTo: '/static/pkg_js_1.js'
    })
    .match('/widget/**.js', {
        optimizer: fis.plugin('uglify-js'),
        packTo: '/widget/pkg_js_2.js'
    })
    .match('**.less', {
        optimizer: fis.plugin('clean-css'),
        packTo: '/static/pkg_css.css'
    })
    .match('*', {
        deploy: fis.plugin('local-deliver', {
            to: './output'
        })
    });
