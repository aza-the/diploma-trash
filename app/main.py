from fastapi import FastAPI, Request, Depends, UploadFile
import aiofiles
from urllib.parse import unquote
import io
from fastapi.responses import RedirectResponse, HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from PIL import Image

import crud
import models
import schemas
from database import SessionLocal, engine
from utils import run_preditcion_on_model


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def main():
    app = FastAPI()
    app.mount(
        '/static', StaticFiles(directory='app/static'), name='static')

    templates = Jinja2Templates(directory='app/templates')
    models.Base.metadata.create_all(bind=engine)

    # INFO: END POINTS

    @app.get('/', response_class=HTMLResponse)
    def get_chat_page(request: Request):
        return templates.TemplateResponse(
            'site.html', context={'request': request})

    @app.post('/uploadfile/')
    async def upload_file(file: UploadFile):
        content = await file.read()
        # image = Image.open(io.BytesIO(content))
        # image.save(f'app/static/{file.filename}')
        async with aiofiles.open(f'app/static/{file.filename}', 'wb') as out_file:
            await out_file.write(content)  # async write
        return {'filename': file.filename}

    @app.get('/getfile/{file}')
    async def get_file(file: str):
        return FileResponse(f'app/static/{unquote(file)}')

    @app.post('/items/')
    def create_items(items: list[schemas.Item], db: Session = Depends(get_db)):
        for item in items:
            exists = crud.get_item(db, item.name)
            if exists:
                crud.merge_item(db, item)
            else:
                crud.create_item(db=db, item=item)

    @app.get('/items/{category}/{subcategory}', response_model=list[schemas.Item])
    def read_items(category: str, subcategory: str, db: Session = Depends(get_db)):
        items = crud.get_items_by_category_and_subcategory(
            db, unquote(category), unquote(subcategory))
        return items

    # INFO: FLATS PAGES
    # ATTENTION!!!
    @app.get('/flats/', response_class=HTMLResponse)
    def get_flats_page(request: Request):
        return templates.TemplateResponse(
            "flats_up/flats.html", context={"request": request}
        )

    @app.post('/flats/')
    def post_flats_page(
        _: Request,
        form_data: schemas.FlatForm
    ):
        prediction = run_preditcion_on_model(
            district=form_data.district,
            metro_name=form_data.underground_station,
            metro_time=int(form_data.underground_time),
            metro_get_type=form_data.underground_get_type,
            size=float(form_data.flat_size),
            kitchen=float(form_data.kitchen_size),
            floor=int(form_data.storey),
            floors=int(form_data.storeys),
            constructed=int(form_data.construction_date),
            fix=form_data.renovation,
            type_of_building=form_data.construction_type,
            type_of_walls=form_data.wall,
        )

        prediction = str(prediction)

        return {"Итог": prediction}

    @app.exception_handler(404)
    def custom_404_handler(request: Request, __):
        return RedirectResponse(url='/')

    return app


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:main', host='0.0.0.0', port=5000, reload=True)
