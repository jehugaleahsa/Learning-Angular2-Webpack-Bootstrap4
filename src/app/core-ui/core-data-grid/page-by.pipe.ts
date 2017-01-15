import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "pageBy"
})
export class PageByPipe implements PipeTransform {
    public transform(values: any[], pageSize: number, page: number): any[] {
        if (pageSize === null) {
            return values;
        }
        const skipCount = pageSize * (page - 1);
        const pageItems = values.slice(skipCount, skipCount + pageSize);
        return pageItems;
    }
}
