<template>
<div>
    <div class="left">
        <h1>Profile</h1>
        <div>
            <a href=""><img src="../images/ProfilePicture.png" alt="profile picture" class="image"></a>
        </div>
        <div>
            <button type ="button" class="profilebtn" onclick="location.href='/update'">Update Profile</button>
        </div>
        <div class>
            <p>Username</p>
            <p>Name</p>
            <p>Email</p>

        </div>
    </div>
    <div class="right">
        <div class="top">
            <table>
                <th>Tasks</th>
                <tr>Tasks unavailable at the moment</tr>
            </table>
        </div>
        <div class="bottom">
            <table>
                <th>Schedule</th>
                <tr>Schedule unavailable at the moment</tr>
            </table>
        </div>
    </div>
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Some text in the Modal..</p>
        </div>
    </div>
</div>
</template>
<style scoped>
.left{
height: 100%;
position: fixed;
top: 0;
width: 25%;
left: 0;
background-color: rgb(71, 37, 63);
}
.right{
height: 100%;
position: fixed;
top: 0;
width: 75%;
right: 0;
background-color: white;
}
.image{
width: 10vw;
border-radius: 50%;
margin: 10px;
border: 1px solid black;
}
h1{
font-size: 4vw;
color: white;
}
p{
color: white;
font-size: 2vw;
margin: 2vw 2vw;
}
button{
color: white;
background-color: rgb(55, 55, 158);
width: 10vw;
height: 2.5vw;
font-size: 1vw;
font-weight: 50%;
margin: 10px;
}
button:hover{
color: black;
background-color: rgb(255, 255, 255);
font-weight: 70%;
}
th,tr{
text-align: left;
border: 2px solid black;
}
th{
background-color: rgb(71, 37, 63);
color: white;
height: 4vw;
}
tr{
height: 10vw;
}
table{
margin: 3vw auto;
width: 50vw;
}
.top{
width: 100%;
height: 50%;
top: 0;
left:0;
background-color: white;
}
.bottom{
width: 100%;
height: 50%;
bottom: 0;
right:0;
background-color: white;
}
</style>
