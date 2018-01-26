import { OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationsService } from 'angular2-notifications'
import { Observable } from 'rxjs/Observable'
import { AuthService } from '../../core/auth'
import { ComponentPagination } from '../rest/component-pagination.model'
import { SortField } from './sort-field.type'
import { VideoChannel } from './video-channel.model'

export abstract class AbstractVideoChannelList implements OnInit {
  pagination: ComponentPagination = {
    currentPage: 1,
    itemsPerPage: 25,
    totalItems: null
  }
  sort: SortField = '-createdAt'
  defaultSort: SortField = '-createdAt'
  channels: VideoChannel[] = []
  loadOnInit = true

  protected abstract notificationsService: NotificationsService
  protected abstract authService: AuthService
  protected abstract router: Router
  protected abstract route: ActivatedRoute

  protected abstract currentRoute: string

  abstract titlePage: string
  private loadedPages: { [ id: number ]: boolean } = {}

  abstract getChannelsObservable (): Observable<{ channels: VideoChannel[], totalChannels: number}>

  get user () {
    return this.authService.getUser()
  }

  ngOnInit () {
    // Subscribe to route changes
    const routeParams = this.route.snapshot.params
    this.loadRouteParams(routeParams)

    if (this.loadOnInit === true) this.loadMoreChannels('after')
  }

  onNearOfTop () {
    if (this.pagination.currentPage > 1) {
      this.previousPage()
    }
  }

  onNearOfBottom () {
    if (this.hasMoreChannels()) {
      this.nextPage()
    }
  }

  reloadChannels () {
    this.channels = []
    this.loadedPages = {}
    this.loadMoreChannels('before')
  }

  loadMoreChannels (where: 'before' | 'after') {
    if (this.loadedPages[this.pagination.currentPage] === true) return

    const observable = this.getChannelsObservable()

    observable.subscribe(
      ({ channels, totalChannels }) => {
        // Paging is too high, return to the first one
        if (this.pagination.currentPage > 1 && totalChannels <= ((this.pagination.currentPage - 1) * this.pagination.itemsPerPage)) {
          this.pagination.currentPage = 1
          this.setNewRouteParams()
          return this.reloadChannels()
        }

        this.loadedPages[this.pagination.currentPage] = true
        this.pagination.totalItems = totalChannels

        if (where === 'before') {
          this.channels = channels.concat(this.channels)
        } else {
          this.channels = this.channels.concat(channels)
        }
      },
      error => this.notificationsService.error('Error', error.message)
    )
  }

  protected hasMoreChannels () {
    // No results
    if (this.pagination.totalItems === 0) return false

    // Not loaded yet
    if (!this.pagination.totalItems) return true

    const maxPage = this.pagination.totalItems / this.pagination.itemsPerPage
    return maxPage > this.pagination.currentPage
  }

  protected previousPage () {
    this.pagination.currentPage--

    this.setNewRouteParams()
    this.loadMoreChannels('before')
  }

  protected nextPage () {
    this.pagination.currentPage++

    this.setNewRouteParams()
    this.loadMoreChannels('after')
  }

  protected buildRouteParams () {
    // There is always a sort and a current page
    const params = {
      sort: this.sort,
      page: this.pagination.currentPage
    }

    return params
  }

  protected loadRouteParams (routeParams: { [ key: string ]: any }) {
    this.sort = routeParams['sort'] as SortField || this.defaultSort

    if (routeParams['page'] !== undefined) {
      this.pagination.currentPage = parseInt(routeParams['page'], 10)
    } else {
      this.pagination.currentPage = 1
    }
  }

  protected setNewRouteParams () {
    const routeParams = this.buildRouteParams()
    this.router.navigate([ this.currentRoute, routeParams ])
  }
}
