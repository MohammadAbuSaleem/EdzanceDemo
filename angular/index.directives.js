import { routeBodyClassComponent } from './directives/routeBody/routeBody.component'
import { PasswordVerifyClassComponent } from './directives/password-verify/password-verify.component'
import { myEnterClassComponent } from './directives/myEnter/myEnter.component'
import { edViewClassComponent } from './directives/edView/edView.component'
import { hAClassComponent } from './directives/hA/hA.component'
import { postRepeatClassComponent } from './directives/postRepeat/postRepeat.component'
import { postNewClassComponent } from './directives/postNew/postNew.component'
import { commentRepeatClassComponent } from './directives/commentRepeat/commentRepeat.component'
import { rMClassComponent } from './directives/rM/rM.component'
import { activeFaceClassComponent } from './directives/activeFace/activeFace.component'
import { fileUploadClassComponent } from './directives/fileUpload/fileUpload.component'
import { imgModelClassComponent } from './directives/imgModel/imgModel.component'
import { deleteBoxClassComponent } from './directives/deleteBox/deleteBox.component'
import { scrollHereClassComponent } from './directives/scrollHere/scrollHere.component'
import { lightGalleryClassComponent } from './directives/lightGallery/lightGallery.component'
import { youtubeVideoClassComponent } from './directives/youtubeVideo/youtubeVideo.component'
import { autoGrowClassComponent } from './directives/autoGrow/autoGrow.component'
import { tagsChipsClassComponent } from './directives/tagsChips/tagsChips.component'
import { classyLoaderClassComponent } from './directives/classyLoader/classyLoader.component'
import { metaTagClassComponent } from './directives/metaTag/metaTag.component'
import { videoPostClassComponent } from './directives/videoPost/videoPost.component'
import { videoPostPopupClassComponent } from './directives/videoPostPopup/videoPostPopup.component'
import { userContentClassComponent } from './directives/userContent/userContent.component'
import { liveUrlClassComponent } from './directives/liveUrl/liveUrl.component'
import { routeHtmlClassComponent } from './directives/routeHtml/routeHtml.component'
import { chatBoxClassComponent } from './directives/chatBox/chatBox.component'
import { closeMenuClassComponent } from './directives/closeMenu/closeMenu.component'
import { emojoFaceClassComponent } from './directives/emojoFace/emojoFace.component'
import { whenScrolledClassComponent } from './directives/whenScrolled/whenScrolled.component'
import { scrollBottomOnClassComponent } from './directives/scrollBottomOn/scrollBottomOn.component'
import { postInstituteClassComponent } from './directives/postInstitute/postInstitute.component'
import { examRepeaterClassComponent } from './directives/examRepeater/examRepeater.component'

angular.module('app.components')
 .directive('routeBody', routeBodyClassComponent)
 .directive('passwordVerify', PasswordVerifyClassComponent)
 .directive('myEnter', myEnterClassComponent)
 .directive('edView', edViewClassComponent)
 .directive('hA', hAClassComponent)
 .directive('postRepeat', postRepeatClassComponent)
 .directive('postNew', postNewClassComponent)
 .directive('commentRepeat', commentRepeatClassComponent)
 .directive('rM', rMClassComponent)
 .directive('activeFace', activeFaceClassComponent)
 .directive('fileUpload', fileUploadClassComponent)
 .directive('imgModel', imgModelClassComponent)
 .directive('deleteBox', deleteBoxClassComponent) 
 .directive('scrollHere', scrollHereClassComponent)
 .directive('lightGallery', lightGalleryClassComponent)
 .directive('youtubeVideo', youtubeVideoClassComponent)
 .directive('autoGrow', autoGrowClassComponent)
 .directive('tagsChips', tagsChipsClassComponent)
 .directive('classyLoader', classyLoaderClassComponent)
 .directive('metaTag', metaTagClassComponent)
 .directive('videoPost', videoPostClassComponent)
 .directive('videoPostPopup', videoPostPopupClassComponent)
 .directive('userContent', userContentClassComponent)
 .directive('liveUrl', liveUrlClassComponent)
 .directive('routeHtml', routeHtmlClassComponent)
 .directive('chatBox', chatBoxClassComponent)
 .directive('closeMenu', closeMenuClassComponent)
 .directive('emojoFace', emojoFaceClassComponent)
 .directive('whenScrolled', whenScrolledClassComponent)
 .directive('scrollBottomOn', scrollBottomOnClassComponent)
 .directive('postInstitute', postInstituteClassComponent)
 .directive('examRepeater', examRepeaterClassComponent)