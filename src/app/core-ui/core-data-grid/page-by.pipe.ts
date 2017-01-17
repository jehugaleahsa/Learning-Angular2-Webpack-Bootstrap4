import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "pageBy"
})
export class PageByPipe implements PipeTransform {
    public transform(values: any[], pageSize: number, page: number, isServerSide: boolean = false): any[] {
        if (pageSize === null || isServerSide === true) {
            return values;
        }
        const startIndex = pageSize * (page - 1);
        const endIndex = Math.min(startIndex + pageSize, values.length);
        const pageItems = values.slice(startIndex, endIndex);
        return pageItems;
    }
}
