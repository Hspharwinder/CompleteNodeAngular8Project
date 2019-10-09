import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  
export class Data {
    gamesCheckBoxList  = [
        { item_id: 1, item_text: 'Cricket' },
        { item_id: 2, item_text: 'Puzzle' },
        { item_id: 3, item_text: 'Chess' },
    ];

    Dept = [
      { id: 1, name: 'Development', desi: ['Manager', 'TeamLead', 'TeamMemeber']  },
      { id: 2, name: 'Management', desi: ['Director', 'CTO', 'HR']  },
      { id: 3, name: 'Desiging', desi: ['Sr.Designer', 'Designer', 'Jr.Designer'] },
    ];
    hobbiesList = [
      { item_id: 1, item_text: 'Action' },
      { item_id: 2, item_text: 'Comedy' },
      { item_id: 3, item_text: 'Drama' },
      { item_id: 4, item_text: 'Romance' },
      { item_id: 5, item_text: 'Dance' }
    ];  

   role = ['Admin', 'User' ];
}
