fis.hook('module', {
    mod: 'commonJs'
}).set('namespace', 'chengyu');

fis.media('dev')
    .match('*.{css,less}', {
        parser: fis.plugin('less'),
        useHash: false,
        rExt: '.css'
    })
    .match('/static/page/**.js', {
        isMod: true,
        release: '$0',
        useHash: false
    })
    .match('/static/lib/**.js', {
        isMod: false,
        release: '$0',
        useHash: false
    })
    .match('/widget/**.tmpl', {
        parser:fis.plugin('utc'),
        rExt:'js',
        release:false
    })
    .match('/widget/**.js', {
        isMod: true,
        release: '$0',
        requires: [
            '/static/mod.js',
            '/static/lib/zepto/zepto.js'
        ]
    })
    .match('/widget/**.{less,css}', {
        isMod: true,
        useHash: false
    })
    .match('::package', {
        // npm install [-g] fis3-postpackager-loader
        // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
        postpackager: fis.plugin('loader', {
            resourceType: 'commonJs',
            useInlineMap: true // 资源映射表内嵌
        })
    })
    .match('*', {
        domain: 'http://lnmp.baidu.com/chengyu',
        deploy: fis.plugin('local-deliver', {
            to: '/home/wwwroot/default/chengyu'
        })
    });


// prod 
fis
    .media('prod').set('pkg', '/')

// 删除部上线内容
.set('project.ignore', [
    'output/**',
    'test/**',
    '**.sh',
    '**.md',
    'fis-conf.js'
])

// 全局
.match('*.{css,less}', {
        parser: fis.plugin('less'),
        optimizer: fis.plugin('clean-css'),
        useHash: true,
        rExt: '.css'
    })
    .match('*.js', {
        optimizer: fis.plugin('uglify-js'),
        useHash: true
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('*.html', {
        useMap: true
    })

// static 
.match('/static/**.{less,js}', {
        isMod: true,
        release: '$0'
    })
    .match('/static/mod.js', {
        isMod: false
    })
    .match('/static/**.js', {
        packTo: '${pkg}/static/all_static.js'
    })
    .match('/static/**.css', {
        packTo: '${pkg}/static/all_static.css'
    })

// widget
.match('/widget/**.{less,js}', {
        isMod: true,
        useHash: true
    })
    .match('/widget/**.js', {
        packTo: '${pkg}/widget/all_widget.js'
    })
    .match('/widget/**.less', {
        packTo: '${pkg}/widget/all_widget.css'
    })

// package
.match('::package', {
        // npm install [-g] fis3-postpackager-loader
        // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
        postpackager: fis.plugin('loader', {
            resourceType: 'commonJs',
            useInlineMap: true // 资源映射表内嵌
        })
    })
    .match('*', {
        domain: 'http://outsource.idoar.com/chengyu',
        deploy: fis.plugin('local-deliver', {
            to: './output/'
        })
    });
