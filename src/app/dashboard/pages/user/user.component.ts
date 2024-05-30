import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { User } from '@interfaces/req-res';
import { UsersService } from '@services/users.service';
import TitleComponent from '@shared/title/title.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
  ],
templateUrl: './user.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {

  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  public user = toSignal<User>(this.route.params.pipe(
    switchMap(
      ({id}) => this.usersService.getUserById(id)
    )
  ));

  public titleLabel = computed(() => {
    if (this.user()) {
      return `Información del usuario ${this.user()?.first_name} ${this.user()?.last_name}`;
    }

    return 'Cargando...';
  });
}
