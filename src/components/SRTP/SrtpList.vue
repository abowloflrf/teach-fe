<template>
    <Table border :columns="col" :data="list"></Table>
</template>
<script>
import SrtpTableExpand from "./SrtpTableExpand.vue";
export default {
    data() {
        return {
            col: [
                {
                    type: "expand",
                    width: 50,
                    render: (h, params) => {
                        return h(SrtpTableExpand, {
                            props: {
                                row: params.row
                            },
                            on: {
                                processed: this.fetchTableData
                            }
                        });
                    }
                },
                {
                    title: "项目名",
                    key: "title"
                },
                {
                    title: "年度",
                    key: "year",
                    width: 100,
                    filters: [
                        {
                            label: "2018",
                            value: 2018
                        },
                        {
                            label: "2017",
                            value: 2017
                        },
                        {
                            label: "2016",
                            value: 2016
                        },
                        {
                            label: "2015及以前",
                            value: 0
                        }
                    ],
                    filterMultiple: false,
                    filterMethod(value, row) {
                        if (value === 0) return row.year <= 2015;
                        else return row.year === value;
                    }
                },
                {
                    title: "负责人",
                    key: "leader"
                },
                {
                    title: "级别",
                    key: "level",
                    width: 100,
                    render: (h, params) => {
                        var levelName;
                        switch (params.row.level) {
                            case 1:
                                levelName = "院级";
                                break;
                            case 2:
                                levelName = "市级";
                                break;
                            case 3:
                                levelName = "国家级";
                                break;
                            default:
                                break;
                        }
                        return h("strong", levelName);
                    },
                    filters: [
                        {
                            label: "院级",
                            value: 1
                        },
                        {
                            label: "市级",
                            value: 2
                        },
                        {
                            label: "国家级",
                            value: 3
                        }
                    ],
                    filterMultiple: false,
                    filterMethod(value, row) {
                        return row.level === value;
                    }
                },
                {
                    title: "状态",
                    key: "status",
                    filters: [
                        {
                            label: "申请审核中",
                            value: 1
                        },
                        {
                            label: "前期进行中",
                            value: 2
                        },
                        {
                            label: "中期审核中",
                            value: 3
                        },
                        {
                            label: "后期进行中",
                            value: 4
                        },
                        {
                            label: "延期进行中",
                            value: 5
                        },
                        {
                            label: "结题审核中",
                            value: 6
                        },
                        {
                            label: "已结题",
                            value: 7
                        },
                        {
                            label: "已终止",
                            value: 8
                        }
                    ],
                    render: (h, params) => {
                        var statusName;
                        switch (params.row.status) {
                            case 1:
                                statusName = "申请审核中";
                                break;
                            case 2:
                                statusName = "前期进行中";
                                break;
                            case 3:
                                statusName = "中期审核中";
                                break;
                            case 4:
                                statusName = "后期进行中";
                                break;
                            case 5:
                                statusName = "延期进行中";
                                break;
                            case 6:
                                statusName = "结题审核中";
                                break;
                            case 7:
                                statusName = "已结题";
                                break;
                            case 8:
                                statusName = "已终止";
                                break;
                            default:
                                break;
                        }
                        return h("span", statusName);
                    },
                    filterMultiple: false,
                    filterMethod(value, row) {
                        return row.status === value;
                    }
                }
            ],
            list: []
        };
    },
    methods: {
        fetchTableData() {
            this.$axios.get("/api/assistant/srtp").then(response => {
                this.list = response.data;
            });
        }
    },
    beforeMount() {
        this.fetchTableData();
    }
};
</script>
