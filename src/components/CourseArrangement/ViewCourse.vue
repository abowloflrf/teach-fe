<template>
    <div>
        <h1>排课结果</h1>
        <Select v-model="selectType" style="width:120px">
            <Option v-for="ty in typeList" :value="ty.value" :key="ty.value">{{ ty.label }}</Option>
        </Select>
        <Select v-model="selectedTeacher" style="width:100px">
            <Option v-for="te in teacherList" :value="te.id" :key="te.id">{{ te.name }}</Option>
        </Select>
        <Select v-model="selectedClassroom" style="width:150px">
            <Option v-for="cr in classroomList" :value="cr.id" :key="cr.id">{{ cr.name }}</Option>
        </Select>
        <Select v-model="selectedClass" style="width:150px">
            <Option v-for="cl in classList" :value="cl.id" :key="cl.id">{{ cl.name }}</Option>
        </Select>
        <Button type="default" @click="fetchTableData">查看</Button>
        <Table border :columns="col" :data="awesomeCourseList" :loading="isLoading"></Table>
        <br><br>
        <Button type="primary" @click="doArrange" :loading="isSubmitButtonLoading">一键排课</Button>
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
            isSubmitButtonLoading: false,
            selectType: 0,
            typeList: [
                {
                    value: 0,
                    label: "按教师显示"
                },
                {
                    value: 1,
                    label: "按教室显示"
                },
                {
                    value: 2,
                    label: "按班级显示"
                }
            ],
            selectedTeacher: 1,
            teacherList: [],
            selectedClassroom: 1,
            classroomList: [],
            selectedClass: 1,
            classList: []
        };
    },
    methods: {
        clearCourseList() {
            this.awesomeCourseList = [
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
            ];
        },
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
            var formData = new FormData();
            if (this.selectType === 0) {
                apiUrl = "/course/timetable/teacher/";
                formData.append("tid", this.selectedTeacher);
            } else if (this.selectType === 1) {
                apiUrl = "/course/timetable/classroom/";
                formData.append("rid", this.selectedClassroom);
            } else if (this.selectType === 2) {
                apiUrl = "/course/timetable/class/";
                formData.append("cid", this.selectedClass);
            }
            this.clearCourseList();
            this.isLoading = true;
            this.$axios.post(apiUrl, formData).then(response => {
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
        },
        doArrange() {
            this.isSubmitButtonLoading = true;
            this.clearCourseList();
            let formData = new FormData();
            formData.append("week", 4);
            formData.append("day", 5);
            formData.append("slot", 5);
            this.$axios
                .post("/course/assignment/execute/", formData)
                .then(response => {
                    this.isSubmitButtonLoading = false;
                    this.$Message.success("排课成功，请重新选择选项查看课表");
                })
                .catch(error => {
                    this.isSubmitButtonLoading = false;
                    this.$Message.error("排课失败");
                });
        }
    },
    beforeMount() {
        this.$axios.get("/course/list/class/").then(response => {
            this.classList = response.data.data;
            this.selectedClass = this.classList[0].id;
        });
        this.$axios.get("/course/list/classroom/").then(response => {
            this.classroomList = response.data.data;
            this.selectedClassroom = this.classroomList[0].id;
        });
        this.$axios.get("/course/list/teacher/").then(response => {
            this.teacherList = response.data.data;
            this.selectedTeacher = this.teacherList[0].id;
        });
    }
};
</script>

<style>
.ivu-select {
    margin: 10px 10px 10px 0;
}
</style>

