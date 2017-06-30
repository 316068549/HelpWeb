import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  data;
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";

  constructor() {

      this.data = [{
        'name': 'Wing',
        'email': 'tellus.eu.augue@arcu.com',
        'regDate': '2016-01-09T14:48:34-08:00',
        'city': 'Paglieta',
        'age': 25
      },
        {
          'name': 'Whitney',
          'email': 'sed.dictum@Donec.org',
          'regDate': '2017-01-23T20:09:52-08:00',
          'city': 'Bear',
          'age': 32
        },
        {
          'name': 'Oliver',
          'email': 'mauris@Craslorem.ca',
          'regDate': '2015-11-19T19:11:33-08:00',
          'city': 'Bruderheim',
          'age': 31
        },
        {
          'name': 'Vladimir',
          'email': 'mi.Aliquam@Phasellus.net',
          'regDate': '2015-11-02T07:59:34-08:00',
          'city': 'Andenne',
          'age': 50
        },
        {
          'name': 'Maggy',
          'email': 'ligula@acorciUt.edu',
          'regDate': '2017-02-25T15:42:17-08:00',
          'city': 'HomprŽ',
          'age': 24
        },
        {
          'name': 'Unity',
          'email': 'Nunc.commodo@justo.org',
          'regDate': '2016-03-07T03:47:55-08:00',
          'city': 'Ried im Innkreis',
          'age': 23
        },
        {
          'name': 'Ralph',
          'email': 'augue@penatibuset.net',
          'regDate': '2017-02-27T20:03:50-08:00',
          'city': 'Cwmbran',
          'age': 45
        },
        {
          'name': 'Medge',
          'email': 'sagittis.augue@taciti.edu',
          'regDate': '2016-03-02T03:59:17-08:00',
          'city': 'Maranguape',
          'age': 21
        },
        {
          'name': 'Orli',
          'email': 'nascetur@mipedenonummy.edu',
          'regDate': '2016-11-07T20:48:43-08:00',
          'city': 'Gibbons',
          'age': 38
        },
        {
          'name': 'Wing',
          'email': 'tellus.eu.augue@arcu.com',
          'regDate': '2016-01-09T14:48:34-08:00',
          'city': 'Paglieta',
          'age': 25
        },
        {
          'name': 'Whitney',
          'email': 'sed.dictum@Donec.org',
          'regDate': '2017-01-23T20:09:52-08:00',
          'city': 'Bear',
          'age': 32
        },
        {
          'name': 'Oliver',
          'email': 'mauris@Craslorem.ca',
          'regDate': '2015-11-19T19:11:33-08:00',
          'city': 'Bruderheim',
          'age': 31
        },
        {
          'name': 'Vladimir',
          'email': 'mi.Aliquam@Phasellus.net',
          'regDate': '2015-11-02T07:59:34-08:00',
          'city': 'Andenne',
          'age': 50
        },
        {
          'name': 'Maggy',
          'email': 'ligula@acorciUt.edu',
          'regDate': '2017-02-25T15:42:17-08:00',
          'city': 'HomprŽ',
          'age': 24
        },
        {
          'name': 'Unity',
          'email': 'Nunc.commodo@justo.org',
          'regDate': '2016-03-07T03:47:55-08:00',
          'city': 'Ried im Innkreis',
          'age': 23
        },
        {
          'name': 'Ralph',
          'email': 'augue@penatibuset.net',
          'regDate': '2017-02-27T20:03:50-08:00',
          'city': 'Cwmbran',
          'age': 45
        },
        {
          'name': 'Medge',
          'email': 'sagittis.augue@taciti.edu',
          'regDate': '2016-03-02T03:59:17-08:00',
          'city': 'Maranguape',
          'age': 21
        },
        {
          'name': 'Orli',
          'email': 'nascetur@mipedenonummy.edu',
          'regDate': '2016-11-07T20:48:43-08:00',
          'city': 'Gibbons',
          'age': 38
        }

        ];

  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

  ngOnInit() {
  }

}



