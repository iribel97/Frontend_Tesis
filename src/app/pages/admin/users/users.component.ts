import { Component } from '@angular/core';
import {TableComponent} from "../../../shared/ui/table/table.component";

@Component({
  selector: 'app-users',
    imports: [
        TableComponent
    ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users = [
  { Nombre: 'John Doe', Email: 'john@example.com', Rol: 'Admin' },
  { Nombre: 'Jane Smith', Email: 'jane@example.com', Rol: 'User' },
  { Nombre: 'Alice Johnson', Email: 'alice@example.com', Rol: 'User' },
  { Nombre: 'Bob Brown', Email: 'bob@example.com', Rol: 'Admin' },
  { Nombre: 'Charlie Davis', Email: 'charlie@example.com', Rol: 'User' },
  { Nombre: 'Diana Evans', Email: 'diana@example.com', Rol: 'User' },
  { Nombre: 'Evan Foster', Email: 'evan@example.com', Rol: 'Admin' },
  { Nombre: 'Fiona Green', Email: 'fiona@example.com', Rol: 'User' },
  { Nombre: 'George Harris', Email: 'george@example.com', Rol: 'User' },
  { Nombre: 'Hannah Ingram', Email: 'hannah@example.com', Rol: 'Admin' },
  { Nombre: 'Ian Jackson', Email: 'ian@example.com', Rol: 'User' },
  { Nombre: 'Julia King', Email: 'julia@example.com', Rol: 'User' },
  { Nombre: 'Kevin Lewis', Email: 'kevin@example.com', Rol: 'Admin' },
  { Nombre: 'Laura Martinez', Email: 'laura@example.com', Rol: 'User' },
  { Nombre: 'Michael Nelson', Email: 'michael@example.com', Rol: 'User' },
  { Nombre: 'Nina Owens', Email: 'nina@example.com', Rol: 'Admin' },
  { Nombre: 'Oscar Perez', Email: 'oscar@example.com', Rol: 'User' },
  { Nombre: 'Paula Quinn', Email: 'paula@example.com', Rol: 'User' },
  { Nombre: 'Quincy Roberts', Email: 'quincy@example.com', Rol: 'Admin' },
  { Nombre: 'Rachel Scott', Email: 'rachel@example.com', Rol: 'User' },
  { Nombre: 'Sam Taylor', Email: 'sam@example.com', Rol: 'User' },
  { Nombre: 'Tina Underwood', Email: 'tina@example.com', Rol: 'Admin' },
  { Nombre: 'Ursula Vance', Email: 'ursula@example.com', Rol: 'User' },
  { Nombre: 'Victor White', Email: 'victor@example.com', Rol: 'User' },
  { Nombre: 'Wendy Xiong', Email: 'wendy@example.com', Rol: 'Admin' },
  { Nombre: 'Xander Young', Email: 'xander@example.com', Rol: 'User' },
  { Nombre: 'Yara Zane', Email: 'yara@example.com', Rol: 'User' },
  { Nombre: 'Zachary Adams', Email: 'zachary@example.com', Rol: 'Admin' },
  { Nombre: 'Amy Baker', Email: 'amy@example.com', Rol: 'User' },
  { Nombre: 'Brian Clark', Email: 'brian@example.com', Rol: 'User' },
  { Nombre: 'Cathy Diaz', Email: 'cathy@example.com', Rol: 'Admin' },
  { Nombre: 'David Edwards', Email: 'david@example.com', Rol: 'User' },
  { Nombre: 'Ella Ford', Email: 'ella@example.com', Rol: 'User' },
  { Nombre: 'Frank Garcia', Email: 'frank@example.com', Rol: 'Admin' },
  { Nombre: 'Grace Hill', Email: 'grace@example.com', Rol: 'User' },
  { Nombre: 'Henry Irving', Email: 'henry@example.com', Rol: 'User' },
  { Nombre: 'Isla Johnson', Email: 'isla@example.com', Rol: 'Admin' },
  { Nombre: 'Jack Kelly', Email: 'jack@example.com', Rol: 'User' },
  { Nombre: 'Karen Lee', Email: 'karen@example.com', Rol: 'User' },
];

}
