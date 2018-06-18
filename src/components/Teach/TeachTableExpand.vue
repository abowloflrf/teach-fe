<template>
    <div>
        <Row>
            <b>简介:</b>
            <span class="expand-value">{{ row.description }}</span>
        </Row>
        <Row>
            <div v-if="row.status==1">
                <h4>申请审核中：</h4>
                <p>申请材料：
                    <DownloadFile :fileId="row.apply_file"></DownloadFile>
                    <!-- <a href="">{{row.apply_file}}</a> -->
                </p>
                <Form>
                    <FormItem label="更改项目级别">
                        <RadioGroup v-model="updateTeachLevel">
                            <Radio label="1">院级</Radio>
                            <Radio label="2">市级</Radio>
                            <Radio label="3">国家级</Radio>
                        </RadioGroup>
                    </FormItem>
                    <Button type="primary" size="small" @click="processRequest(201)">通过创建申请</Button>
                    <Button type="error" size="small" @click="processRequest(204)">驳回申请</Button>
                </Form>
            </div>

            <div v-if="row.status==2">
                <h4>前期进行中</h4>
                <p>申请材料：
                    <DownloadFile :fileId="row.apply_file"></DownloadFile>
                    <!-- <a href="">{{row.apply_file}}</a> -->
                </p>
            </div>

            <div v-if="row.status==3">
                <h4>中期审核中</h4>
                <p>申请材料：
                    <DownloadFile :fileId="row.apply_file"></DownloadFile>
                    <!-- <a href="">{{row.apply_file}}</a> -->
                </p>
                <p>中期材料：
                    <DownloadFile :fileId="row.middle_file"></DownloadFile>
                    <!-- <a href="">{{row.middle_file}}</a> -->
                </p>
                <Button type="primary" size="small" @click="processRequest(202)">通过中期审核</Button>
                <Button type="error" size="small" @click="processRequest(204)">驳回审核</Button>
            </div>

            <div v-if="row.status==4">
                <h4>后期进行中</h4>
                <p>申请材料：
                    <DownloadFile :fileId="row.apply_file"></DownloadFile>
                    <!-- <a href="">{{row.apply_file}}</a> -->
                </p>
                <p>中期材料：
                    <DownloadFile :fileId="row.middle_file"></DownloadFile>
                    <!-- <a href="">{{row.middle_file}}</a> -->
                </p>
            </div>

            <div v-if="row.status==5">
                <h4>结题审核中</h4>
                <p>申请材料：
                    <DownloadFile :fileId="row.apply_file"></DownloadFile>
                    <!-- <a href="">{{row.apply_file}}</a> -->
                </p>
                <p>中期材料：
                    <DownloadFile :fileId="row.middle_file"></DownloadFile>
                    <!-- <a href="">{{row.middle_file}}</a> -->
                </p>
                <p>结题材料：
                    <DownloadFile :fileId="row.end_file"></DownloadFile>
                    <!-- <a href="">{{row.end_file}}</a> -->
                </p>
                <Button type="primary" size="small" @click="processRequest(203)">通过结题审核</Button>
                <Button type="error" size="small" @click="processRequest(204)">驳回审核</Button>
            </div>

            <div v-if="row.status==6">
                <h4>已结题</h4>
                <p>申请材料：
                    <DownloadFile :fileId="row.apply_file"></DownloadFile>
                    <!-- <a href="">{{row.apply_file}}</a> -->
                </p>
                <p>中期材料：
                    <DownloadFile :fileId="row.middle_file"></DownloadFile>
                    <!-- <a href="">{{row.middle_file}}</a> -->
                </p>
                <p>结题材料：
                    <DownloadFile :fileId="row.end_file"></DownloadFile>
                    <!-- <a href="">{{row.end_file}}</a> -->
                </p>
            </div>

            <div v-if="row.status==7">
                <h4>已终止</h4>
                <p v-if="row.abort_file!=''">终止材料：
                    <DownloadFile :fileId="row.abort_file"></DownloadFile>
                    <!-- <a href="">{{row.abort_file}}</a> -->
                </p>
            </div>
        </Row>
    </div>
</template>

<script>
import DownloadFile from "../DownloadFile.vue";

export default {
    components: {
        DownloadFile
    },
    props: {
        row: Object
    },
    data() {
        return {
            updateTeachLevel: this.row.level + ""
        };
    },
    methods: {
        processRequest(op) {
            this.$axios
                .patch("/api/assistant/teach/" + this.row.id + "/update", {
                    operation: op,
                    new_level: this.updateTeachLevel
                })
                .then(response => {
                    if (response.data.status == "OK")
                        this.$Message.success("提交成功");
                    else this.$Message.error("提交失败");
                    this.$emit("processed");
                })
                .catch(error => {
                    this.$Message.error("提交出错");
                });
        }
    }
};
</script>

<style scoped>
.expand-row {
    margin-bottom: 16px;
}
.ivu-btn {
    margin-right: 5px;
}
</style>
