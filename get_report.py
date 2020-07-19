import json
import os
import nlp2
import nlprep

datasets_json = {}
for dataset in nlprep.list_all_datasets(ignore_list=["clas_csv", "gen_masklm"]):
    ds = nlprep.load_dataset(dataset)
    ds_info = ds.DATASETINFO
    if 'DATASET_FILE_MAP' in ds_info:
        for ds_name, mf in nlprep.convert_middleformat(ds).items():
            print(ds_name)
            profile = mf.get_report(ds_name)
            profile.to_file(
                os.path.join(nlp2.get_dir_with_notexist_create('./public/reports/'), ds_name + "_report.html"))
            datasets_json[dataset + " : " + ds_name] = {
                "id": dataset,
                'filename': ds_name,
                "fullname": ds_info['FULLNAME'],
                "task": ds_info['TASK'],
                "description": ds_info['DESCRIPTION'],
                "ref": ds_info['REF'],
                "files": list(ds_info['DATASET_FILE_MAP'].keys())
            }

        with open(os.path.join(nlp2.get_dir_with_notexist_create('./src/assets/'), 'datasets.json'), 'w',
                  encoding='utf8') as f:
            json.dump(datasets_json, f, ensure_ascii=False)
