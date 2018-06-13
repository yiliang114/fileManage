package com.mrjzhang.utils;

import java.io.IOException;

import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;

/**
 * Created by @author: mrjzhang on 2018/6/5
 */
public class QiniuImages {

    /* 基本配置-从七牛管理后台拿到 */

    // 设置好账号的ACCESS_KEY和SECRET_KEY
    String accessKey = "ZJJehwefBMU5WlK69OfkBo0_hNMckXbSdFQ_696b";
    String secretKey = "9Kn7Z8aq71lmI-ERBCecflKjoWvpTFc9F6UpBRQ2";
    String bucket    = "element-image";

    // 上传文件的路径
    String FilePath = "C:\\Users\\Mrz2J\\Desktop\\qiniu\\1.jpg";

    // 上传到七牛后保存的文件名    访问为：http://oswj11a86.bkt.clouddn.com/daimo6.png
    String key = "daimo2.png";

    // http://p9eaf78s5.bkt.clouddn.com 外链域名链接
    // 密钥配置
    Auth auth = Auth.create(accessKey, secretKey);

    // 创建上传对象
    UploadManager uploadManager = new UploadManager(new Configuration());

    public static void main(String args[]) throws IOException {
        new QiniuImages().upload();
    }

    public void upload() throws IOException {
        try {

            // 调用put方法上传
            Response res = uploadManager.put(FilePath, key, getUpToken());

            // 打印返回的信息
            System.out.println(res.bodyString());
            System.out.println(res.statusCode);    // 200为上传成功
        } catch (QiniuException e) {
            Response r = e.response;

            // 请求失败时打印的异常的信息
            System.out.println(r.toString());

            try {

                // 响应的文本信息
                System.out.println(r.bodyString());
            } catch (QiniuException e1) {

                // ignore
            }
        }
    }

    // 简单上传，使用默认策略，只需要设置上传的空间名就可以了
    public String getUpToken() {
        return auth.uploadToken(bucket);
    }
}
