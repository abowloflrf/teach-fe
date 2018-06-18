module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://teach.test",
                changeOrigin: true
            },
            "/course": {
                target: "http://teach.test",
                changeOrigin: true
            }
            // "/course": {
            //     target: "http://test.jingwei.site:8000",
            //     changeOrigin: true
            // }
        }
    }
};
