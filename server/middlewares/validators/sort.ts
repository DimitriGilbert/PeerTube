import * as express from 'express'
import { query } from 'express-validator/check'
import { logger } from '../../helpers/logger'
import { SORTABLE_COLUMNS } from '../../initializers'
import { areValidationErrors } from './utils'

// Initialize constants here for better performances
const SORTABLE_USERS_COLUMNS = createSortableColumns(SORTABLE_COLUMNS.USERS)
const SORTABLE_ACCOUNTS_COLUMNS = createSortableColumns(SORTABLE_COLUMNS.ACCOUNTS)
const SORTABLE_JOBS_COLUMNS = createSortableColumns(SORTABLE_COLUMNS.JOBS)
const SORTABLE_VIDEO_ABUSES_COLUMNS = createSortableColumns(SORTABLE_COLUMNS.VIDEO_ABUSES)
const SORTABLE_VIDEOS_COLUMNS = createSortableColumns(SORTABLE_COLUMNS.VIDEOS)
const SORTABLE_VIDEO_COMMENT_THREADS_COLUMNS = createSortableColumns(SORTABLE_COLUMNS.VIDEO_COMMENT_THREADS)
const SORTABLE_BLACKLISTS_COLUMNS = createSortableColumns(SORTABLE_COLUMNS.BLACKLISTS)
const SORTABLE_VIDEO_CHANNELS_COLUMNS = createSortableColumns(SORTABLE_COLUMNS.VIDEO_CHANNELS)
const SORTABLE_VIDEO_CHANNEL_VIDEOS_COLUMNS = createSortableColumns(SORTABLE_COLUMNS.VIDEOS)
const SORTABLE_FOLLOWERS_COLUMNS = createSortableColumns(SORTABLE_COLUMNS.FOLLOWERS)
const SORTABLE_FOLLOWING_COLUMNS = createSortableColumns(SORTABLE_COLUMNS.FOLLOWING)

const usersSortValidator = checkSort(SORTABLE_USERS_COLUMNS)
const accountsSortValidator = checkSort(SORTABLE_ACCOUNTS_COLUMNS)
const jobsSortValidator = checkSort(SORTABLE_JOBS_COLUMNS)
const videoAbusesSortValidator = checkSort(SORTABLE_VIDEO_ABUSES_COLUMNS)
const videosSortValidator = checkSort(SORTABLE_VIDEOS_COLUMNS)
const videoCommentThreadsSortValidator = checkSort(SORTABLE_VIDEO_COMMENT_THREADS_COLUMNS)
const blacklistSortValidator = checkSort(SORTABLE_BLACKLISTS_COLUMNS)
const videoChannelsSortValidator = checkSort(SORTABLE_VIDEO_CHANNELS_COLUMNS)
const videoChannelVideosSortValidator = checkSort(SORTABLE_VIDEO_CHANNEL_VIDEOS_COLUMNS)
const followersSortValidator = checkSort(SORTABLE_FOLLOWERS_COLUMNS)
const followingSortValidator = checkSort(SORTABLE_FOLLOWING_COLUMNS)

// ---------------------------------------------------------------------------

export {
  usersSortValidator,
  videoAbusesSortValidator,
  videoChannelsSortValidator,
  videoChannelVideosSortValidator,
  videosSortValidator,
  blacklistSortValidator,
  accountsSortValidator,
  followersSortValidator,
  followingSortValidator,
  jobsSortValidator,
  videoCommentThreadsSortValidator
}

// ---------------------------------------------------------------------------

function checkSort (sortableColumns: string[]) {
  return [
    query('sort').optional().isIn(sortableColumns).withMessage('Should have correct sortable column'),

    (req: express.Request, res: express.Response, next: express.NextFunction) => {
      logger.debug('Checking sort parameters', { parameters: req.query })

      if (areValidationErrors(req, res)) return

      return next()
    }
  ]
}

function createSortableColumns (sortableColumns: string[]) {
  const sortableColumnDesc = sortableColumns.map(sortableColumn => '-' + sortableColumn)

  return sortableColumns.concat(sortableColumnDesc)
}
