import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbsAuthAvatarComponent } from './avatar.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NgbsAuthAvatarComponent],
  exports: [NgbsAuthAvatarComponent],
})
export class NgbsAvatarModule {}
