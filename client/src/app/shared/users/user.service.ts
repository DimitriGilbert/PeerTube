import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import { User, UserCreate, UserUpdateMe, ResultList, Video as VideoServerModel } from '../../../../../shared'
import { environment } from '../../../environments/environment'
import { RestExtractor } from '../rest'
import { Video } from '@app/shared/video/video.model'

@Injectable()
export class UserService {
  static BASE_USERS_URL = environment.apiUrl + '/api/v1/users/'

  constructor (
    private authHttp: HttpClient,
    private restExtractor: RestExtractor
  ) {}

  changePassword (newPassword: string) {
    const url = UserService.BASE_USERS_URL + 'me'
    const body: UserUpdateMe = {
      password: newPassword
    }

    return this.authHttp.put(url, body)
                        .map(this.restExtractor.extractDataBool)
                        .catch(res => this.restExtractor.handleError(res))
  }

  updateMyDetails (details: UserUpdateMe) {
    const url = UserService.BASE_USERS_URL + 'me'

    return this.authHttp.put(url, details)
                        .map(this.restExtractor.extractDataBool)
                        .catch(res => this.restExtractor.handleError(res))
  }

  changeAvatar (avatarForm: FormData) {
    const url = UserService.BASE_USERS_URL + 'me/avatar/pick'

    return this.authHttp.post(url, avatarForm)
                        .catch(this.restExtractor.handleError)
  }

  signup (userCreate: UserCreate) {
    return this.authHttp.post(UserService.BASE_USERS_URL + 'register', userCreate)
                        .map(this.restExtractor.extractDataBool)
                        .catch(res => this.restExtractor.handleError(res))
  }

  getMyVideoQuotaUsed () {
    const url = UserService.BASE_USERS_URL + '/me/video-quota-used'

    return this.authHttp.get(url)
      .catch(res => this.restExtractor.handleError(res))
  }

  askResetPassword (email: string) {
    const url = UserService.BASE_USERS_URL + '/ask-reset-password'

    return this.authHttp.post(url, { email })
      .map(this.restExtractor.extractDataBool)
      .catch(res => this.restExtractor.handleError(res))
  }

  resetPassword (userId: number, verificationString: string, password: string) {
    const url = `${UserService.BASE_USERS_URL}/${userId}/reset-password`
    const body = {
      verificationString,
      password
    }

    return this.authHttp.post(url, body)
      .map(this.restExtractor.extractDataBool)
      .catch(res => this.restExtractor.handleError(res))
  }

  getUser (userId: number) {
    return this.authHttp.get<User>(UserService.BASE_USERS_URL + userId)
                        .catch(err => this.restExtractor.handleError(err))
  }

  getUserVideos (userId: number) {
    return this.authHttp.get(UserService.BASE_USERS_URL + userId + '/videos')
                        .map(this.extractVideos)
                        .catch(err => this.restExtractor.handleError(err))
  }

  private extractVideos (result: ResultList<VideoServerModel>) {
    const videosJson = result.data
    const totalVideos = result.total
    const videos = []

    for (const videoJson of videosJson) {
      videos.push(new Video(videoJson))
    }

    return { videos, totalVideos }
  }
}
