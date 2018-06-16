<template>
    <Table border :columns="col" :data="list"></Table>
</template>
<script>
import GraTableExpand from "./GraTableExpand.vue";
export default {
    data() {
        return {
            col: [
                {
                    type: "expand",
                    width: 50,
                    render: (h, params) => {
                        return h(GraTableExpand, {
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
                    title: "学生",
                    key: "student"
                },
                {
                    title: "毕业年",
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
                    title: "状态",
                    key: "status",
                    filters: [
                        {
                            label: "申请审核中",
                            value: 1
                        },
                        {
                            label: "等待开题中",
                            value: 2
                        },
                        {
                            label: "前期进行中",
                            value: 3
                        },
                        {
                            label: "后期进行中",
                            value: 4
                        },
                        {
                            label: "已结题",
                            value: 5
                        }
                    ],
                    render: (h, params) => {
                        var statusName;
                        switch (params.row.status) {
                            case 1:
                                statusName = "申请审核中";
                                break;
                            case 2:
                                statusName = "等待开题中";
                                break;
                            case 3:
                                statusName = "前期进行中";
                                break;
                            case 4:
                                statusName = "后期进行中";
                                break;
                            case 5:
                                statusName = "已结题";
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
            this.$axios.get("/api/teacher/graduation").then(response => {
                this.list = response.data;
            });
        }
    },
    beforeMount() {
        this.fetchTableData();
    }
};
</script>
