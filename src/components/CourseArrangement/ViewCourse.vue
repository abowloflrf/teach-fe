<template>
    <div>
        <h1>排课结果</h1>
        <Select v-model="selectType" style="width:120px">
            <Option v-for="ty in typeList" :value="ty.value" :key="ty.value">{{ ty.label }}</Option>
        </Select>
        <Select v-model="selectedTeacher" style="width:100px">
            <Option v-for="te in teacherList" :value="te.value" :key="te.value">{{ te.label }}</Option>
        </Select>
        <Select v-model="selectedCourse" style="width:150px">
            <Option v-for="co in courseList" :value="co.value" :key="co.value">{{ co.label }}</Option>
        </Select>
        <Select v-model="selectedClass" style="width:100px">
            <Option v-for="cl in classList" :value="cl.value" :key="cl.value">{{ cl.label }}</Option>
        </Select>
        <Button type="default" @click="fetchTableData">查看</Button>
        <Table border :columns="col" :data="awesomeCourseList" :loading="isLoading"></Table>
        <br><br>
        <Button type="primary" @click="doArrange">一键排课</Button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            col: [
                {
                    title: "节数",
                    key: "class",
                    width: 120,
                    fixed: "left"
                },
                {
                    title: "周一",
                    key: "mon",
                    width: 200
                },
                {
                    title: "周二",
                    key: "two",
                    width: 200
                },
                {
                    title: "周三",
                    key: "wed",
                    width: 200
                },
                {
                    title: "周四",
                    key: "thu",
                    width: 200
                },
                {
                    title: "周五",
                    key: "fri",
                    width: 200
                }
            ],
            course: Object,
            awesomeCourseList: [
                {
                    class: "1 (8:00-9:35)",
                    mon: "",
                    two: "",
                    wed: "",
                    thu: "",
                    fri: ""
                },
                {
                    class: "2 (9:55-11:30)",
                    mon: "",
                    two: "",
                    wed: "",
                    thu: "",
                    fri: ""
                },
                {
                    class: "3 (13:30-15:05)",
                    mon: "",
                    two: "",
                    wed: "",
                    thu: "",
                    fri: ""
                },
                {
                    class: "4 (15:20-16:55)",
                    mon: "",
                    two: "",
                    wed: "",
                    thu: "",
                    fri: ""
                },
                {
                    class: "5 (17:10-18:45)",
                    mon: "",
                    two: "",
                    wed: "",
                    thu: "",
                    fri: ""
                }
            ],
            isLoading: false,
            selectType: 0,
            typeList: [
                {
                    value: 0,
                    label: "按教师显示"
                },
                {
                    value: 1,
                    label: "按课程显示"
                },
                {
                    value: 2,
                    label: "按班级显示"
                }
            ],
            selectedTeacher: 1,
            teacherList: [
                {
                    value: 1,
                    label: "老师A"
                },
                {
                    value: 2,
                    label: "老师B"
                }
            ],
            selectedCourse: 1,
            courseList: [
                {
                    value: 1,
                    label: "课程A"
                },
                {
                    value: 2,
                    label: "课程B"
                }
            ],
            selectedClass: 1,
            classList: [
                {
                    value: 1,
                    label: "计1501"
                },
                {
                    value: 2,
                    label: "计1502"
                }
            ]
        };
    },
    methods: {
        addCourseToList(day, slot, courseName) {
            var dayName = "";
            switch (day) {
                case 0:
                    dayName = "mon";
                    break;
                case 1:
                    dayName = "two";
                    break;
                case 2:
                    dayName = "wed";
                    break;
                case 3:
                    dayName = "thu";
                    break;
                case 4:
                    dayName = "fri";
                    break;
                default:
                    break;
            }
            this.awesomeCourseList[slot][dayName] = courseName;
        },
        fetchTableData() {
            var apiUrl = "";
            if (this.selectType === 0) apiUrl = "/course/timetable/teacher/";
            else if (this.selectType === 1)
                apiUrl = "/course/timetable/classroom/";
            else if (this.selectType === 2) apiUrl = "/course/timetable/class/";
            //cid rid tid
            this.$Message.warning("查询中");
        },
        doArrange() {
            this.$Message.warning("排课中");
        }
    },
    beforeMount() {
        this.isLoading = true;
        let formData = new FormData();
        formData.append("tid", 2);
        this.$axios
            .post("/course/timetable/teacher/", formData)
            .then(response => {
                this.course = response.data.data;
                this.course.forEach(c => {
                    var showStr =
                        c.course.full_name +
                        "(" +
                        c.course.teacher +
                        ")" +
                        "(" +
                        c.course.week_str +
                        ")";
                    this.addCourseToList(c.day, c.slot, showStr);
                });
                this.isLoading = false;
            });
    }
};
</script>

<style>
.ivu-select {
    margin: 10px 10px 10px 0;
}
</style>

