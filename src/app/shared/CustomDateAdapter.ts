
import { NativeDateAdapter } from '@angular/material/core';
import * as moment from 'moment';

export class CustomDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        moment.locale('pt-BR'); // Choose the locale
        var formatString = (displayFormat === 'input') ? 'LLL' : 'DD/MM/YYYY';
        return moment(date).format(formatString);
    }
}