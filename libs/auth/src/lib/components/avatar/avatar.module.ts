import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbsUncheckOnDocumentClickModule } from '@ngbs/utils'
import { NgbsAuthAvatarComponent } from './avatar.component'
import { NgbsAuthAvatarWidget } from './avatar.widget'

@NgModule({
  imports: [CommonModule, RouterModule, NgbsUncheckOnDocumentClickModule],
  declarations: [NgbsAuthAvatarComponent, NgbsAuthAvatarWidget],
  exports: [NgbsAuthAvatarComponent, NgbsAuthAvatarWidget],
})
export class NgbsAvatarModule {}
