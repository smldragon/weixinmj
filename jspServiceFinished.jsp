<%@ page language='java'  %>
<%@ page language='java' import='com.sbt.control.ServerContextWrapper'%>

<%
    ServerContextWrapper.cleanCurrentThread();
    System.out.println("In jspServiceFinished, clean current thread...............................");
%>
