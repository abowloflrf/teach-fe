<template>
    <div>
        <h1>排课结果</h1>
        <Table size="large"  :columns="col" :data="data"></Table>
        <br><br>
        <Button type="primary">一键排课</Button>
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
                    width: 200,
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
            data: [
                {
                    class: "1 (8:00-9:35)",
                    mon: "test",
                    two: "test",
                    wed: "test",
                    thu: "test",
                    fri: "test"
                },
                {
                    class: "2 (9:55-11:30)",
                    mon: "test",
                    two: "test",
                    wed: "test",
                    thu: "test",
                    fri: "test"
                },
                {
                    class: "3 (13:30-15:05)",
                    mon: "test",
                    two: "test",
                    wed: "test",
                    thu: "test",
                    fri: "test"
                },
                {
                    class: "4 (15:20-16:55)",
                    mon: "test",
                    two: "test",
                    wed: "test",
                    thu: "test",
                    fri: "test"
                },
                {
                    class: "5 (17:10-18:45)",
                    mon: "test",
                    two: "test",
                    wed: "test",
                    thu: "test",
                    fri: "test"
                },
                {
                    class: "6 (19:30-21:05)",
                    mon: "test",
                    two: "test",
                    wed: "test",
                    thu: "test",
                    fri: "test"
                }
            ]
        };
    }
};
</script>
