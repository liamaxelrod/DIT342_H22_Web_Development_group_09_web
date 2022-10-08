<template>
<div>
    <div class="left">
        <h1>Profile</h1>
        <div><img src="../images/ProfilePicture.png" alt="profile picture" class="image" @click="showModal = true"></div>
        <div>
            <button class="btnUser" onclick="location.href='/update'">Update Profile</button>
        </div>
        <div class>
            <p>Username</p>
            <p>Name</p>
            <p>Email</p>
        </div>
        <div>
          <button class="btnUser" id="logoutbtn">log out</button>
        </div>
    </div>
    <div class="right"> <div class="top">
            <table>
                <th>CREATE A SCHEDULE</th>
                <tr>
                  <div>
                    <input type="text" placeholder="Schedule name">
                  </div>
                  <div>
                    <button class="btnUser">
                      Create Schedule
                    </button>
                  </div>
                </tr>
            </table>
        </div>
        <div class="bottom">
            <table>
                <th>DELETE A SCHEDULE</th>
                <tr>
                  <div>
                    <input type="text" placeholder="Schedule Id" required >
                  </div>
                  <button @click="showModal = true" class="btnUser">Delete Schedule</button>
                </tr>
            </table>
        </div>
    </div>
    <modal :show="showModal" @cancel="showModal = false">
    </modal>
</div>
</template>

<script>
import Modal from './Modal.vue'

export default {
  components: {
    Modal
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>
