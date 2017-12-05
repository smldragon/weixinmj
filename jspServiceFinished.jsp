<%@ page language='java'  %>
<%@ page language='java' import='com.sbt.control.ServerContextWrapper'%>

<%
   //close try block in jspServiceStart.jsp -- XFZ@2017-12-04
    }
    finally {
        ServerContextWrapper.cleanCurrentThread();
        System.out.println("In jspServiceFinished, clean current thread2222222...............................");
     }
%>
