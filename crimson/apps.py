import os
import logging
from django.apps import AppConfig
from django.conf import settings

from arches.settings_utils import generate_frontend_configuration


class CrimsonConfig(AppConfig):
    name = "crimson"
    is_arches_application = True

    def ready(self):
        if settings.APP_NAME.lower() == self.name:
            try:
                generate_frontend_configuration()
            except IOError:
                if os.environ.get("ALLOW_BOOTSTRAP", False):
                    raise
                logging.warn("Could not output frontend configuration, maybe in read-only environment")
