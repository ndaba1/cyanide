use std::{
    cmp::Ordering,
    fs::{self},
    io,
    path::Path,
};

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct TreeItem {
    pub fpath: String,
    pub ftype: String,
    pub size: u64,
    pub fname: String,
    pub created_at: String,
    pub updated_at: String,
}

impl TreeItem {
    fn new(p: &str) -> Self {
        let fpath = Path::new(p);
        let fname = fpath.file_name().unwrap();
        let meta = fs::metadata(fpath).expect("An error occurred while parsing files in file tree");
        let size = meta.len();
        let ftype = if fpath.is_symlink() {
            "SYMLINK"
        } else if fpath.is_dir() {
            "DIR"
        } else {
            "FILE"
        };

        let fpath: String = fpath.to_str().unwrap().into();
        let fname: String = fname.to_str().unwrap().into();

        Self {
            fpath,
            ftype: ftype.into(),
            size,
            fname,
            created_at: "".into(),
            updated_at: "".into(),
        }
    }
}

#[tauri::command]
pub fn get_snapshot(dir: String) -> Vec<TreeItem> {
    get_entries(Path::new(&dir))
}

#[tauri::command]
pub fn get_children(item: TreeItem) -> Vec<TreeItem> {
    get_entries(Path::new(&item.fpath))
}

fn get_entries(dir: &Path) -> Vec<TreeItem> {
    let mut entries = fs::read_dir(dir)
        .unwrap()
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, io::Error>>()
        .unwrap();

    // sort the entries
    entries.sort_by(|a, b| {
        if a.is_dir() && !b.is_dir() {
            return Ordering::Less;
        } else if b.is_dir() && !a.is_dir() {
            return Ordering::Greater;
        } else {
            return a.cmp(&b);
        }
    });

    entries
        .iter()
        .map(|e| TreeItem::new(e.to_str().unwrap_or(".")))
        .collect::<Vec<_>>()
}
