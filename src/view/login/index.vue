<template>
  <div class="login-container">
    <el-form
        :model="loginForm"
        autocomplete="on"
        class="login-form"
        label-position="left"
        ref="loginForm"
    >
      <div class="title-container">
        <h3 class="title">
          {{ $translate('login.title') }}
          <lang-select class="right-menu-item hover-effect" style="background: lightgrey;padding: 0 2px;
    border-radius: 2px;"/>
        </h3>
      </div>

      <el-form-item prop="account">
                <span class="svg-container">
                <svg-icon name="user"/>
                </span>
        <el-input
            autocomplete="on"
            name="account"
            :placeholder="$translate('login.account')"
            ref="account"
            type="text"
            v-model="loginForm.account"
        />
      </el-form-item>

      <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon name="password"/>
                </span>
        <el-input
            :key="passwordType"
            :type="passwordType"
            @keyup.enter.native="handleLogin"
            autocomplete="on"
            name="password"
            :placeholder="$translate('login.password')"
            ref="password"
            v-model="loginForm.password"
        />
      </el-form-item>

      <el-button
          :loading="loading"
          @click.native.prevent="handleLogin"
          class="login-btn"
          type="primary"
      >
        {{ $translate('login.login') }}
      </el-button>
    </el-form>
    <span class="copyright">
            Copyright©2019-{{ currentYear() }} {{ $translate('login.copyright') }}
        </span>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Input} from 'element-ui'
import userSession from "@/store/module/UserSession";
import LangSelect from "@/component/LangSelect/index.vue"
import UserApi from "@/module/user/UserApi";
import {Inject} from "typescript-ioc";
import {LocalStorageWrapper} from '@/storage/StorageWrapper';
import StorageKey from '@/storage/StorageKey';

@Component({
  components: {
    LangSelect
  }
})
export default class LoginView extends Vue {

  @Inject
  private userApi!: UserApi

  @Inject
  storage!: LocalStorageWrapper

  private loginForm = {
    account: 'admin',
    password: 'admin'
  }
  private passwordType = 'password'
  private loading = false

  private async handleLogin() {
    if (!userSession.isLogged) {
      const result = await this.userApi.login(this.loginForm)
      this.storage.set(StorageKey.TOKEN, result.token)
      userSession.activate(result.user)
    }
    this.$redirector.redirectWithFrom()
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus()
    })
  }

  private created() {
    if (userSession.isLogged)
      this.$redirector.redirectWithFrom()
  }

  private currentYear() {
    return new Date().getFullYear()
  }
}
</script>

<style lang="scss">
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }

    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss">
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .login-btn {
    width: 100%;
    margin-bottom: 30px;
    background-color: $loginBtnColor;
    border: $loginBtnColor;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 40px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 7px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .copyright {
    font-weight: 700;
    color: $lightGray;
    position: fixed;
    bottom: 20px;
    width: 100%;
    text-align: center;
  }
}
</style>
