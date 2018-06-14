package com.mrjzhang.utils;

/**
 * Created by @author: mrjzhang on 2018/6/14
 */
public class CmdBody {
  private String serverIp;
  private String serverPort;
  private String fileSrc;
  private String folderSrc;
  private int scanInterval;
  private int type;

  public String getServerIp() {
    return serverIp;
  }

  public void setServerIp(String serverIp) {
    this.serverIp = serverIp;
  }

  public String getServerPort() {
    return serverPort;
  }

  public void setServerPort(String serverPort) {
    this.serverPort = serverPort;
  }

  public String getFileSrc() {
    return fileSrc;
  }

  public void setFileSrc(String fileSrc) {
    this.fileSrc = fileSrc;
  }

  public String getFolderSrc() {
    return folderSrc;
  }

  public void setFolderSrc(String folderSrc) {
    this.folderSrc = folderSrc;
  }

  public int getScanInterval() {
    return scanInterval;
  }

  public void setScanInterval(int scanInterval) {
    this.scanInterval = scanInterval;
  }

  public int getType() {
    return type;
  }

  public void setType(int type) {
    this.type = type;
  }
}
