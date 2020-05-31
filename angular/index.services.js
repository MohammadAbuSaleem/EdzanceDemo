import {PostService} from './services/Post.service';
import { ContextService } from './services/context.service'
import { APIService } from './services/API.service'
import { chatMessagesService } from './services/chatMessages.service'

angular.module('app.services')
	.service('Post', PostService)
  .service('ContextService', ContextService)
  .service('API', APIService)
  .service('chatMessages', chatMessagesService)
