import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

interface ErrorLog {
  err: Error;
  vm: object;
  info: string;
  url: string;
}

export interface ErrorLogModule {
  logs: ErrorLog[];
}

@Module({ dynamic: true, store, namespaced: true, name: 'errorLog' })
class ErrorLogModuleImpl extends VuexModule implements ErrorLogModule {
  public logs: ErrorLog[] = []

  @Mutation
  private ADD_ERROR_LOG(log: ErrorLog) {
    this.logs.push(log)
  }

  @Mutation
  private CLEAR_ERROR_LOG() {
    this.logs.splice(0)
  }

  @Action
  public addErrorLog(log: ErrorLog) {
    this.ADD_ERROR_LOG(log)
  }

  @Action
  public clearErrorLog() {
    this.CLEAR_ERROR_LOG()
  }
}

export const errorLogModule = getModule(ErrorLogModuleImpl)
